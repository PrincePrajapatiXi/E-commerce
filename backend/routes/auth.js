import express from 'express';
import {
  signup, login, getMe, verifyEmail,
  resendOtp, forgotPassword, resetPassword,
  checkUsername, checkEmail
} from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', verifyToken, getMe);

router.post('/verify-email', verifyToken, verifyEmail);
router.post('/resend-otp', verifyToken, resendOtp);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.get('/check-username/:username', checkUsername);
router.get('/check-email/:email', checkEmail);

export default router;
