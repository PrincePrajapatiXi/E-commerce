import React, { createContext, useContext } from 'react'; // CLERK AUTH
import { useUser, useAuth as useClerkAuth, useClerk } from '@clerk/clerk-react';

// CLERK AUTH — Thin wrapper around Clerk hooks for backward compatibility
// This allows existing components (Navbar, Account) to keep using useAuth()
// with a familiar API shape while Clerk handles all the heavy lifting.

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const { user: clerkUser, isLoaded: userLoaded, isSignedIn } = useUser();
    const { isLoaded: authLoaded } = useClerkAuth();
    const { signOut } = useClerk();

    const isLoaded = userLoaded && authLoaded;
    const isLoading = !isLoaded;

    // CLERK AUTH — Map Clerk user to a compatible shape
    const user = isSignedIn && clerkUser ? {
        id: clerkUser.id,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        displayName: clerkUser.fullName || clerkUser.firstName || 'User',
        email: clerkUser.emailAddresses?.[0]?.emailAddress || '',
        imageUrl: clerkUser.imageUrl,
        photoURL: clerkUser.imageUrl, // backward compat with old user shape
    } : null;

    const logout = async () => {
        await signOut();
    };

    const value = {
        user,
        isLoading,
        isLoaded,
        isAuthenticated: !!isSignedIn,
        isSignedIn: !!isSignedIn,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
