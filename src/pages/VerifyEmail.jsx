import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, RefreshCw, AlertCircle, LogOut, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const VerifyEmail = () => {
    const { user, verifyEmail, resendVerification, logout } = useAuth();
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [cooldown, setCooldown] = useState(0);
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [showToast, setShowToast] = useState({ show: false, message: '', type: '' });

    useEffect(() => {
        // If no user or email already verified, go home
        if (!user) {
            navigate('/account');
        } else if (user.isEmailVerified) {
            navigate('/');
        }
    }, [user, navigate]);

    useEffect(() => {
        let timer;
        if (cooldown > 0) {
            timer = setInterval(() => setCooldown(prev => prev - 1), 1000);
        }
        return () => clearInterval(timer);
    }, [cooldown]);

    const displayToast = (message, type) => {
        setShowToast({ show: true, message, type });
        setTimeout(() => setShowToast({ show: false, message: '', type: '' }), 4000);
    };

    const handleResend = async () => {
        if (cooldown > 0) return;
        setResendLoading(true);
        try {
            await resendVerification();
            displayToast('Verification OTP resent successfully! Check your inbox.', 'success');
            setCooldown(60);
        } catch (error) {
            displayToast(error.message || 'Failed to resend. Try again later.', 'error');
        } finally {
            setResendLoading(false);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        
        if (!otp || otp.length !== 6) {
            displayToast('Please enter a valid 6-digit OTP.', 'error');
            return;
        }

        setLoading(true);
        try {
            await verifyEmail(otp);
            displayToast('Email verified successfully!', 'success');
            setTimeout(() => navigate('/'), 1500);
        } catch (error) {
            displayToast(error.message || 'Invalid OTP or verification failed.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {showToast.show && (
                <div className="fixed top-4 right-4 z-50">
                    <div className={`px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 text-white ${
                        showToast.type === 'success' ? 'bg-green-500' :
                        showToast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                    }`}>
                        {showToast.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        <p className="font-medium text-sm sm:text-base">{showToast.message}</p>
                    </div>
                </div>
            )}
            
            <div className="max-w-md w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700 relative z-10 animate-slideUp text-center">
                <div className="mx-auto w-20 h-20 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <Mail size={40} />
                </div>
                
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Verify your email</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-base">
                    We sent a 6-digit OTP code to <br/>
                    <strong className="text-gray-900 dark:text-white mt-1 inline-block">{user.email}</strong>
                </p>
                
                <form onSubmit={handleVerify} className="space-y-6">
                    <div>
                        <input
                            type="text"
                            maxLength="6"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            placeholder="• • • • • •"
                            className="w-full text-center text-3xl tracking-[1em] font-mono py-4 px-4 border-2 border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-primary"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || otp.length !== 6}
                        className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-primary hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="animate-spin mr-2" size={20}/> : null}
                        {loading ? 'Verifying...' : 'Verify Email'}
                    </button>
                </form>

                <div className="mt-6 space-y-4">
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={cooldown > 0 || resendLoading}
                        className="w-full flex justify-center items-center py-3.5 px-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <RefreshCw size={18} className={`mr-2 ${resendLoading && 'animate-spin'}`} />
                        {cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP Code'}
                    </button>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 focus:outline-none transition-all duration-200"
                    >
                        <LogOut size={18} className="mr-2" /> Logout
                    </button>
                </div>
            </div>
            
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
    );
};

export default VerifyEmail;
