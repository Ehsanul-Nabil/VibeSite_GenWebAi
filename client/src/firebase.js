
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBf5vT0SYNtEDin_-dI1cY4E636Kt67O14",
  authDomain: "vibesitegenai.firebaseapp.com",
  projectId: "vibesitegenai",
  storageBucket: "vibesitegenai.firebasestorage.app",
  messagingSenderId: "753446357936",
  appId: "1:753446357936:web:0e6937204de7ba3d616475"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth & Providers
export const auth = getAuth(app);
export const githubProvider = new GithubAuthProvider();
export const googleProvider = new GoogleAuthProvider();
githubProvider.addScope("user:email"); // Requests access to private email addresses