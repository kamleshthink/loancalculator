import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
    signOut,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from 'firebase/auth';
import { 
    auth,
    signInWithGoogle,
    signInWithGithub,
    signInWithFacebook,
    signInWithTwitter
} from '../firebase';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const handleAuthError = (error) => {
        console.error('Auth Error:', error);
        switch (error.code) {
            case 'auth/popup-closed-by-user':
                return 'Sign in was cancelled';
            case 'auth/account-exists-with-different-credential':
                return 'An account already exists with the same email address but different sign-in credentials';
            case 'auth/popup-blocked':
                return 'Sign in popup was blocked by the browser';
            case 'auth/cancelled-popup-request':
                return 'Only one sign in popup can be open at a time';
            case 'auth/operation-not-allowed':
                return 'This sign in method is not enabled. Please contact support.';
            case 'auth/user-disabled':
                return 'This account has been disabled';
            case 'auth/user-not-found':
                return 'No account found with this email';
            case 'auth/wrong-password':
                return 'Incorrect password';
            case 'auth/invalid-email':
                return 'Invalid email address';
            case 'auth/too-many-requests':
                return 'Too many unsuccessful login attempts. Please try again later.';
            default:
                return error.message || 'An error occurred during authentication';
        }
    };

    const signin = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return result.user;
        } catch (error) {
            throw new Error(handleAuthError(error));
        }
    };

    const signup = async (email, password) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            return result.user;
        } catch (error) {
            throw new Error(handleAuthError(error));
        }
    };

    const signout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            throw new Error(handleAuthError(error));
        }
    };

    const signinWithProvider = async (provider, providerName) => {
        try {
            const result = await provider();
            return result.user;
        } catch (error) {
            throw new Error(handleAuthError(error));
        }
    };

    const value = {
        currentUser,
        loading,
        error,
        signin,
        signup,
        signout,
        signinWithGoogle: () => signinWithProvider(signInWithGoogle, 'Google'),
        signinWithGithub: () => signinWithProvider(signInWithGithub, 'GitHub'),
        signinWithFacebook: () => signinWithProvider(signInWithFacebook, 'Facebook'),
        signinWithTwitter: () => signinWithProvider(signInWithTwitter, 'Twitter')
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
