import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail.js';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'fallback-secret-12345', {
    expiresIn: '7d'
  });
};

// Memory store for OTPs (For production, use Redis or MongoDB for OTP tracking)
const otpStore = new Map();

export const signup = async (req, res) => {
  try {
    const { email, username, password, name } = req.body;
    
    const existingUser = await User.findOne({ 
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }]
    });
    
    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      return res.status(400).json({ message: 'Username already taken' });
    }

    const user = new User({ email, username, password, name, authProvider: 'local' });
    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: user.toPublicJSON()
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during signup', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    const user = await User.findOne({
      $or: [
        { email: emailOrUsername.toLowerCase() },
        { username: emailOrUsername.toLowerCase() }
      ]
    }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    if (user.isBlocked) {
        return res.status(403).json({ message: 'Your account has been blocked' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: 'Logged in successfully',
      token,
      user: user.toPublicJSON()
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.status(200).json({ user: user.toPublicJSON() });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve profile', error: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
     const { otp } = req.body;
     const storedData = otpStore.get(req.user.id);

     if (storedData && storedData.otp === otp && storedData.expires > Date.now()) {
         await User.findByIdAndUpdate(req.user.id, { isEmailVerified: true });
         otpStore.delete(req.user.id);
         res.status(200).json({ message: 'Email verified successfully' });
     } else {
         res.status(400).json({ message: 'Invalid or expired OTP' });
     }
  } catch (error) {
    res.status(500).json({ message: 'Email verification error', error: error.message });
  }
};

export const resendOtp = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        otpStore.set(req.user.id, { otp, expires: Date.now() + 10 * 60000 }); // 10 minutes validation
        await sendEmail(user.email, 'Your Verification OTP', `Your Account Verification OTP is ${otp}. It will expire in 10 minutes.`);
        
        res.status(200).json({ message: 'OTP sent to email' });
    } catch(error) {
        res.status(500).json({ message: 'Failed to send OTP', error: error.message });
    }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: 'User not found with this email' });
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(user.email, { otp, expires: Date.now() + 10 * 60000 });
    
    await sendEmail(user.email, 'Password Reset OTP', `Your password reset OTP is ${otp}. It will expire in 10 minutes.`);
    
    res.status(200).json({ message: 'Password reset OTP has been sent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to process forgot password request', error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    
    const storedData = otpStore.get(email.toLowerCase());
    
    if (!storedData || storedData.otp !== otp || storedData.expires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
    
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    user.password = newPassword;
    await user.save(); // Model's pre-save middleware takes care of bcrypt hash
    
    otpStore.delete(user.email);
    res.status(200).json({ message: 'Password has been successfully reset' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reset password', error: error.message });
  }
};

export const checkUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username.toLowerCase() });
    res.status(200).json({ available: !user });
  } catch (error) {
    res.status(500).json({ message: 'Verification error', error: error.message });
  }
};

export const checkEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email: email.toLowerCase() });
    res.status(200).json({ available: !user });
  } catch (error) {
    res.status(500).json({ message: 'Verification error', error: error.message });
  }
};
