import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    browserLocalPersistence, 
    setPersistence,
    GithubAuthProvider,
    GoogleAuthProvider,
    FacebookAuthProvider,
    TwitterAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAlFzNA-VJUxtfs09lNWhrwZNJt-lohVTc",
    authDomain: "loginapp-5703b.firebaseapp.com",
    projectId: "loginapp-5703b",
    storageBucket: "loginapp-5703b.appspot.com",
    messagingSenderId: "943221944634",
    appId: "1:943221944634:web:363ac57c56e040a322e003",
    measurementId: "G-S9YJ3S603Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = getAuth();
setPersistence(auth, browserLocalPersistence)
    .catch((error) => {
        console.error("Auth persistence error:", error);
    });

// Initialize providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

// Configure provider settings
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

githubProvider.setCustomParameters({
    allow_signup: 'true'
});

// Helper functions for social sign-in
const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result;
    } catch (error) {
        console.error('Google sign-in error:', error);
        throw error;
    }
};

const signInWithGithub = async () => {
    try {
        const result = await signInWithPopup(auth, githubProvider);
        return result;
    } catch (error) {
        console.error('GitHub sign-in error:', error);
        throw error;
    }
};

const signInWithFacebook = async () => {
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        return result;
    } catch (error) {
        console.error('Facebook sign-in error:', error);
        throw error;
    }
};

const signInWithTwitter = async () => {
    try {
        const result = await signInWithPopup(auth, twitterProvider);
        return result;
    } catch (error) {
        console.error('Twitter sign-in error:', error);
        throw error;
    }
};

// Initialize other services
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { 
    auth,
    db, 
    analytics,
    signInWithGoogle,
    signInWithGithub,
    signInWithFacebook,
    signInWithTwitter
};
