// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

/*===========================================*/
/*===========================================*/
/*===========================================*/

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-480f7.firebaseapp.com",
  projectId: "mern-auth-480f7",
  storageBucket: "mern-auth-480f7.firebasestorage.app",
  messagingSenderId: "503523063194",
  appId: "1:503523063194:web:2cc14a5ae8d318e7687623"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);