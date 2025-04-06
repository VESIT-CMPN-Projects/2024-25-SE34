// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFNno1UaJ9bpYKtIliF7gQ25JUnnYxJ90",
  authDomain: "jfgr-webpage.firebaseapp.com",
  projectId: "jfgr-webpage",
  storageBucket: "jfgr-webpage.appspot.com",
  messagingSenderId: "230082324060",
  appId: "1:230082324060:web:7ff44dd6c680568d0de899"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;