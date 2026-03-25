import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    minlength: 3,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    select: false
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    default: ''
  },
  authProvider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },
  providerId: {
    type: String,
    default: null
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isBlocked: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Pre-save hook for password hashing
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to return user representation without sensitive fields
userSchema.methods.toPublicJSON = function () {
  const userObj = this.toObject();
  delete userObj.password;
  return userObj;
};

const User = mongoose.model('User', userSchema);
export default User;
