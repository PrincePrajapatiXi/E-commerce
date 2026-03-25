import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, Loader2, CheckCircle, XCircle, AlertCircle, Package, Settings, ArrowLeft, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Account = () => {
    const { user, signInWithGoogle, logout, signup, login } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [authLoading, setAuthLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, type: '', message: '' });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [validation, setValidation] = useState({
        email: { valid: null, message: '' },
        password: { valid: null, message: '' },
        confirmPassword: { valid: null, message: '' },
        name: { valid: null, message: '' }
    });

    const [passwordStrength, setPasswordStrength] = useState({ level: '', score: 0 });

    // Validate email format
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // Calculate password strength
    const getPasswordStrength = (password) => {
        if (!password) return { level: '', score: 0 };

        let score = 0;
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[^a-zA-Z\d]/.test(password)) score++;

        if (score <= 2) return { level: 'weak', score };
        if (score <= 3) return { level: 'medium', score };
        return { level: 'strong', score };
    };

    // Handle input changes with real-time validation
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Real-time validation
        if (name === 'email' && value) {
            const isValid = validateEmail(value);
            setValidation(prev => ({
                ...prev,
                email: {
                    valid: isValid,
                    message: isValid ? 'Valid email' : 'Please enter a valid email'
                }
            }));
        }

        if (name === 'password' && value) {
            const strength = getPasswordStrength(value);
            setPasswordStrength(strength);
            setValidation(prev => ({
                ...prev,
                password: {
                    valid: strength.score >= 2,
                    message: strength.score >= 2 ? 'Password strength: ' + strength.level : 'Password too weak'
                }
            }));

            // Also check confirm password match if it exists
            if (formData.confirmPassword) {
                const matches = value === formData.confirmPassword;
                setValidation(prev => ({
                    ...prev,
                    confirmPassword: {
                        valid: matches,
                        message: matches ? 'Passwords match' : 'Passwords do not match'
                    }
                }));
            }
        }

        if (name === 'confirmPassword' && value) {
            const matches = value === formData.password;
            setValidation(prev => ({
                ...prev,
                confirmPassword: {
                    valid: matches,
                    message: matches ? 'Passwords match' : 'Passwords do not match'
                }
            }));
        }

        if (name === 'name' && value) {
            const isValid = value.trim().length >= 2;
            setValidation(prev => ({
                ...prev,
                name: {
                    valid: isValid,
                    message: isValid ? 'Valid name' : 'Name must be at least 2 characters'
                }
            }));
        }
    };

    // Show toast notification
    const showToast = (type, message) => {
        setToast({ show: true, type, message });
        setTimeout(() => setToast({ show: false, type: '', message: '' }), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.email || !formData.password) {
            showToast('error', 'Please fill in all required fields');
            return;
        }

        if (!isLogin && (!formData.name || formData.password !== formData.confirmPassword)) {
            showToast('error', 'Please ensure all signup fields are valid');
            return;
        }

        setAuthLoading(true);

        try {
            if (isLogin) {
                await login(formData.email, formData.password);
                showToast('success', 'Logged in successfully!');
                navigate('/');
            } else {
                await signup(formData.email, formData.password, formData.name);
                showToast('success', 'Account created! Please check your email to verify.');
                navigate('/verify-email');
            }
        } catch (error) {
            console.error(error);
            showToast('error', error.message || 'Authentication failed');
        } finally {
            setAuthLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        if (!import.meta.env.VITE_FIREBASE_API_KEY) {
            showToast('error', 'Vite did not load the API Key. Please refresh browser (F5)!');
            return;
        }

        try {
            await signInWithGoogle();
            showToast('success', 'Logged in with Google successfully!');
            setTimeout(() => navigate('/'), 1000);
        } catch (error) {
            console.error(error);
            showToast('error', `Login failed: ${error.message}`);
        }
    };

    // Reset validation when switching between login/signup
    useEffect(() => {
        setValidation({
            email: { valid: null, message: '' },
            password: { valid: null, message: '' },
            confirmPassword: { valid: null, message: '' },
            name: { valid: null, message: '' }
        });
        setPasswordStrength({ level: '', score: 0 });
    }, [isLogin]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-8 sm:py-12 md:py-16 px-4">
            {/* Toast Notification */}
            {toast.show && (
                <div className="fixed top-4 right-4 z-50 toast">
                    <div className={`px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 ${toast.type === 'success' ? 'bg-success text-white' :
                            toast.type === 'error' ? 'bg-error text-white' :
                                'bg-info text-white'
                        }`}>
                        {toast.type === 'success' && <CheckCircle size={20} />}
                        {toast.type === 'error' && <XCircle size={20} />}
                        {toast.type === 'info' && <AlertCircle size={20} />}
                        <p className="font-medium text-sm sm:text-base">{toast.message}</p>
                    </div>
                </div>
            )}

            <div className="max-w-md mx-auto">
                {user ? (
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20 dark:border-gray-700 animate-fadeIn">
                        {activeTab === 'dashboard' && (
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow overflow-hidden">
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-3xl font-bold text-white uppercase">{user.displayName ? user.displayName.charAt(0) : user.email?.charAt(0) || 'U'}</span>
                                    )}
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome, {user.displayName || 'User'}!</h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-8">{user.email}</p>
                                
                                <div className="space-y-4">
                                    <button onClick={() => setActiveTab('orders')} className="w-full flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-3 px-6 rounded-xl font-medium transition-colors border border-gray-200 dark:border-gray-600">
                                        <Package size={20} /> My Orders
                                    </button>
                                    <button onClick={() => setActiveTab('settings')} className="w-full flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-3 px-6 rounded-xl font-medium transition-colors border border-gray-200 dark:border-gray-600">
                                        <Settings size={20} /> Edit Profile
                                    </button>
                                    <button onClick={() => { setActiveTab('dashboard'); logout(); navigate('/'); }} className="w-full flex items-center justify-center gap-2 bg-error/10 hover:bg-error/20 text-error py-3 px-6 rounded-xl font-medium transition-colors mt-4">
                                        <LogOut size={20} /> Sign Out
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div className="animate-fadeIn">
                                <button onClick={() => setActiveTab('dashboard')} className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary mb-6 transition-colors">
                                    <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
                                </button>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"><Package className="text-primary"/> My Orders</h3>
                                
                                <div className="space-y-4">
                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center border border-dashed border-gray-300 dark:border-gray-600">
                                        <Package size={48} className="mx-auto text-gray-400 mb-3" />
                                        <p className="text-gray-600 dark:text-gray-300 font-medium">No orders yet</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Looks like you haven't made your choice yet.</p>
                                        <Link to="/products" className="inline-block mt-4 bg-primary text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors shadow-button hover:shadow-button-hover btn-ripple">Start Shopping</Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="animate-fadeIn">
                                <button onClick={() => setActiveTab('dashboard')} className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary mb-6 transition-colors">
                                    <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
                                </button>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"><Settings className="text-primary"/> Account Settings</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                        <input type="text" readOnly value={user.displayName || 'User'} className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600 cursor-not-allowed opacity-70" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                                        <input type="email" readOnly value={user.email} className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600 cursor-not-allowed opacity-70" />
                                    </div>
                                    <div className="pb-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account Provider</label>
                                        <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 capitalize inline-block border border-gray-200 dark:border-gray-700">
                                            {user.providerData && user.providerData.length > 0 ? user.providerData[0].providerId : 'Google'}
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <button onClick={() => showToast('success', 'Profile settings are up to date.')} className="w-full bg-gradient-primary text-white py-3 rounded-xl font-semibold shadow-button hover:shadow-glow hover:-translate-y-0.5 transform transition-all btn-ripple">Save Changes</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8 animate-fadeIn">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow animate-pulse-slow">
                        <User className="text-white" size={window.innerWidth < 640 ? 32 : 40} />
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        {isLogin ? 'Welcome Back!' : 'Create Account'}
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600">
                        {isLogin ? 'Sign in to continue shopping' : 'Join us for exclusive deals'}
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20 animate-slideUp">
                    {/* Toggle Buttons */}
                    <div className="flex bg-gray-100 rounded-xl p-1 mb-6 sm:mb-8">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-2.5 sm:py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform text-sm sm:text-base min-h-[44px] ${isLogin
                                    ? 'bg-gradient-primary text-white shadow-lg scale-105'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-2.5 sm:py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform text-sm sm:text-base min-h-[44px] ${!isLogin
                                    ? 'bg-gradient-primary text-white shadow-lg scale-105'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                        {/* Name Field (Sign Up Only) */}
                        {!isLogin && (
                            <div className="animate-slideDown">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                                        <User className="text-gray-400" size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required={!isLogin}
                                        className={`w-full pl-10 sm:pl-12 pr-10 py-3 sm:py-3.5 border-2 rounded-xl transition-all duration-200 text-sm sm:text-base min-h-[44px] ${validation.name.valid === null
                                                ? 'border-gray-300 focus:border-primary'
                                                : validation.name.valid
                                                    ? 'border-success focus:border-success'
                                                    : 'border-error focus:border-error'
                                            } focus:ring-2 focus:ring-primary/20 focus:outline-none hover:border-gray-400`}
                                        placeholder="John Doe"
                                    />
                                    {validation.name.valid !== null && (
                                        <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center">
                                            {validation.name.valid ? (
                                                <CheckCircle className="text-success" size={20} />
                                            ) : (
                                                <XCircle className="text-error" size={20} />
                                            )}
                                        </div>
                                    )}
                                </div>
                                {validation.name.message && (
                                    <p className={`mt-1.5 text-xs sm:text-sm ${validation.name.valid ? 'text-success' : 'text-error'}`}>
                                        {validation.name.message}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                                    <Mail className="text-gray-400" size={20} />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className={`w-full pl-10 sm:pl-12 pr-10 py-3 sm:py-3.5 border-2 rounded-xl transition-all duration-200 text-sm sm:text-base min-h-[44px] ${validation.email.valid === null
                                            ? 'border-gray-300 focus:border-primary'
                                            : validation.email.valid
                                                ? 'border-success focus:border-success'
                                                : 'border-error focus:border-error'
                                        } focus:ring-2 focus:ring-primary/20 focus:outline-none hover:border-gray-400`}
                                    placeholder="john@example.com"
                                />
                                {validation.email.valid !== null && (
                                    <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center">
                                        {validation.email.valid ? (
                                            <CheckCircle className="text-success" size={20} />
                                        ) : (
                                            <XCircle className="text-error" size={20} />
                                        )}
                                    </div>
                                )}
                            </div>
                            {validation.email.message && (
                                <p className={`mt-1.5 text-xs sm:text-sm ${validation.email.valid ? 'text-success' : 'text-error'}`}>
                                    {validation.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                                    <Lock className="text-gray-400" size={20} />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className={`w-full pl-10 sm:pl-12 pr-12 py-3 sm:py-3.5 border-2 rounded-xl transition-all duration-200 text-sm sm:text-base min-h-[44px] ${validation.password.valid === null
                                            ? 'border-gray-300 focus:border-primary'
                                            : validation.password.valid
                                                ? 'border-success focus:border-success'
                                                : 'border-error focus:border-error'
                                        } focus:ring-2 focus:ring-primary/20 focus:outline-none hover:border-gray-400`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center min-h-[44px] min-w-[44px] justify-center"
                                >
                                    {showPassword ? (
                                        <EyeOff className="text-gray-400 hover:text-gray-600 transition" size={20} />
                                    ) : (
                                        <Eye className="text-gray-400 hover:text-gray-600 transition" size={20} />
                                    )}
                                </button>
                            </div>

                            {/* Password Strength Indicator */}
                            {!isLogin && formData.password && (
                                <div className="mt-2">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs text-gray-600">Password Strength</span>
                                        <span className={`text-xs font-semibold ${passwordStrength.level === 'weak' ? 'text-error' :
                                                passwordStrength.level === 'medium' ? 'text-warning' :
                                                    'text-success'
                                            }`}>
                                            {passwordStrength.level.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                                        <div
                                            className={`h-1.5 rounded-full transition-all duration-300 ${passwordStrength.level === 'weak' ? 'bg-error w-1/3' :
                                                    passwordStrength.level === 'medium' ? 'bg-warning w-2/3' :
                                                        'bg-success w-full'
                                                }`}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password (Sign Up Only) */}
                        {!isLogin && (
                            <div className="animate-slideDown">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                                        <Lock className="text-gray-400" size={20} />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required={!isLogin}
                                        className={`w-full pl-10 sm:pl-12 pr-12 py-3 sm:py-3.5 border-2 rounded-xl transition-all duration-200 text-sm sm:text-base min-h-[44px] ${validation.confirmPassword.valid === null
                                                ? 'border-gray-300 focus:border-primary'
                                                : validation.confirmPassword.valid
                                                    ? 'border-success focus:border-success'
                                                    : 'border-error focus:border-error'
                                            } focus:ring-2 focus:ring-primary/20 focus:outline-none hover:border-gray-400`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center min-h-[44px] min-w-[44px] justify-center"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="text-gray-400 hover:text-gray-600 transition" size={20} />
                                        ) : (
                                            <Eye className="text-gray-400 hover:text-gray-600 transition" size={20} />
                                        )}
                                    </button>
                                </div>
                                {validation.confirmPassword.message && (
                                    <p className={`mt-1.5 text-xs sm:text-sm ${validation.confirmPassword.valid ? 'text-success' : 'text-error'}`}>
                                        {validation.confirmPassword.message}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Remember Me & Forgot Password (Login Only) */}
                        {isLogin && (
                            <div className="flex items-center justify-between">
                                <label className="flex items-center cursor-pointer min-h-[44px]">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
                                    />
                                    <span className="ml-2 text-xs sm:text-sm text-gray-600">Remember me</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => showToast('info', 'Password reset feature coming soon!')}
                                    className="text-xs sm:text-sm text-primary hover:underline font-medium min-h-[44px] flex items-center"
                                >
                                    Forgot password?
                                </button>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={authLoading}
                            className="w-full bg-gradient-primary text-white py-3 sm:py-3.5 px-6 rounded-xl font-semibold hover:shadow-glow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:transform-none flex items-center justify-center gap-2 shadow-button hover:shadow-button-hover btn-ripple min-h-[44px] text-sm sm:text-base"
                        >
                            {authLoading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Processing...
                                </>
                            ) : (
                                <>{isLogin ? 'Sign In' : 'Create Account'}</>
                            )}
                        </button>

                        {/* Terms (Sign Up Only) */}
                        {!isLogin && (
                            <p className="text-xs text-center text-gray-600 animate-fadeIn">
                                By signing up, you agree to our{' '}
                                <Link to="/terms" className="text-primary hover:underline font-medium">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link to="/privacy" className="text-primary hover:underline font-medium">
                                    Privacy Policy
                                </Link>
                            </p>
                        )}
                    </form>

                    {/* Social Login */}
                    <div className="mt-6 sm:mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-xs sm:text-sm">
                                <span className="px-4 bg-white/80 text-gray-500 font-medium">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-3 sm:gap-4">
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="flex items-center justify-center px-4 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all transform hover:-translate-y-0.5 shadow-sm hover:shadow-md min-h-[44px]"
                            >
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="text-xs sm:text-sm font-medium text-gray-700">Google</span>
                            </button>
                            <button
                                onClick={() => showToast('info', 'Facebook login coming soon!')}
                                className="flex items-center justify-center px-4 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all transform hover:-translate-y-0.5 shadow-sm hover:shadow-md min-h-[44px]"
                            >
                                <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                <span className="text-xs sm:text-sm font-medium text-gray-700">Facebook</span>
                            </button>
                        </div>
                    </div>
                </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Account;
