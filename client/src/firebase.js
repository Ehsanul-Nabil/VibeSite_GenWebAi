// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
//   apiKey: "AIzaSyCz9gjvfrSnAJbzXM-gTqmFPvFQdDflUao",
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "genwebai-b5ffa.firebaseapp.com",
  projectId: "genwebai-b5ffa",
  storageBucket: "genwebai-b5ffa.firebasestorage.app",
  messagingSenderId: "660804044001",
  appId: "1:660804044001:web:c873f8ad8a2c6a8f6b23a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider=new GoogleAuthProvider()

export {auth, provider}



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// import { getAuth, GoogleAuthProvider } from "firebase/auth"
// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: "genwebai-dbb06.firebaseapp.com",
//   projectId: "genwebai-dbb06",
//   storageBucket: "genwebai-dbb06.firebasestorage.app",
//   messagingSenderId: "991900800026",
//   appId: "1:991900800026:web:84b905ccab6e1ea2c16da3"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app)
// const provider=new GoogleAuthProvider()

// export {auth, provider}