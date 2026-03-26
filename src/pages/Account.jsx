import React, { useState } from 'react'; // CLERK AUTH
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, Settings, ArrowLeft, LogOut, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserButton } from '@clerk/clerk-react'; // CLERK AUTH

const Account = () => {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [toast, setToast] = useState({ show: false, type: '', message: '' });

    const showToast = (type, message) => {
        setToast({ show: true, type, message });
        setTimeout(() => setToast({ show: false, type: '', message: '' }), 3000);
    };

    // CLERK AUTH — Show loading while Clerk loads
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
                <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full shadow-glow"></div>
            </div>
        );
    }

    // CLERK AUTH — Redirect to sign-in if not logged in
    if (!user) {
        navigate('/sign-in');
        return null;
    }

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
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20 dark:border-gray-700 animate-fadeIn">
                    {activeTab === 'dashboard' && (
                        <div className="text-center">
                            {/* CLERK AUTH — UserButton provides avatar, profile management, and sign-out */}
                            <div className="flex justify-end mb-4">
                                <UserButton
                                    afterSignOutUrl="/"
                                    appearance={{
                                        elements: {
                                            avatarBox: 'w-10 h-10'
                                        }
                                    }}
                                />
                            </div>

                            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow overflow-hidden">
                                {user.imageUrl ? (
                                    <img src={user.imageUrl} alt={user.displayName} className="w-full h-full object-cover" />
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
                                        Clerk
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Use the profile button in the top-right corner to manage your account settings via Clerk.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Account;
