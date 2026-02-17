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
  authDomain: "mern--auth-82234.firebaseapp.com",
  projectId: "mern--auth-82234",
  storageBucket: "mern--auth-82234.firebasestorage.app",
  messagingSenderId: "523336202042",
  appId: "1:523336202042:web:106aed39f4ac09be418203"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);