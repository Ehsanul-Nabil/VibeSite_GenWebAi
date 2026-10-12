// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// import { getAuth, GoogleAuthProvider } from "firebase/auth"
// // Your web app's Firebase configuration
// const firebaseConfig = {
// //   apiKey: "AIzaSyCz9gjvfrSnAJbzXM-gTqmFPvFQdDflUao",
//   apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: "genwebai-b5ffa.firebaseapp.com",
//   projectId: "genwebai-b5ffa",
//   storageBucket: "genwebai-b5ffa.firebasestorage.app",
//   messagingSenderId: "660804044001",
//   appId: "1:660804044001:web:c873f8ad8a2c6a8f6b23a0"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app)
// const provider=new GoogleAuthProvider()

// export {auth, provider}


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