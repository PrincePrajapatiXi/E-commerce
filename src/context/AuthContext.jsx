import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    const checkAuth = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setUser(null);
            setIsLoading(false);
            return;
        }

        try {
            const res = await axios.get(`${API_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(res.data.user);
        } catch (error) {
            console.error("Auth check failed:", error);
            localStorage.removeItem('token');
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const signup = async (email, password, name) => {
        try {
            // Include a mock username from email
            const username = email.split('@')[0] + Math.floor(Math.random() * 1000);
            const res = await axios.post(`${API_URL}/auth/signup`, { email, username, password, name });
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            return res.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Signup failed');
        }
    };

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API_URL}/auth/login`, { emailOrUsername: email, password });
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            return res.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    };

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            setUser(result.user);
            return result.user;
        } catch (error) {
            console.error("Google login failed", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        firebaseSignOut(auth).catch(e => console.error(e));
    };

    const verifyEmail = async (otp) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`${API_URL}/auth/verify-email`, { otp }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await checkAuth(); // Refetch verified user
            return res.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Email verification failed');
        }
    };

    const resendVerification = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`${API_URL}/auth/resend-otp`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to resend OTP');
        }
    };

    const resetPassword = async (email, otp, newPassword) => {
        try {
            const res = await axios.post(`${API_URL}/auth/reset-password`, { email, otp, newPassword });
            return res.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Reset password failed');
        }
    };

    const value = {
        user,
        isLoading,
        isAuthenticated: !!user,
        checkAuth,
        signup,
        login,
        signInWithGoogle,
        logout,
        verifyEmail,
        resendVerification,
        resetPassword
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
