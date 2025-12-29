// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD4kAr854Uwmia8X5qPErjbmYMusFJVB8",
  authDomain: "email-password-auth-5c34e.firebaseapp.com",
  projectId: "email-password-auth-5c34e",
  storageBucket: "email-password-auth-5c34e.firebasestorage.app",
  messagingSenderId: "862016116310",
  appId: "1:862016116310:web:9c15ed3975839a658dcdf7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
