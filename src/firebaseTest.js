// This is a test script to check if Firebase configuration is working properly

// Direct Firebase configuration import (no environment variables)
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";

// Test with hardcoded values
const testFirebaseConfig = {
  apiKey: "AIzaSyDwxfnSYlnwVZT6xJQBRxgLKLhEkH1gBjk",
  authDomain: "jfgr-app.firebaseapp.com",
  projectId: "jfgr-app",
  storageBucket: "jfgr-app.appspot.com",
  messagingSenderId: "257451008918",
  appId: "1:257451008918:web:fa8b1bc126a86d7dd38e80"
};

console.log("Testing Firebase connection with configuration:", testFirebaseConfig);

try {
  // Initialize Firebase with the test configuration
  const testApp = initializeApp(testFirebaseConfig);
  const testAuth = getAuth(testApp);
  
  console.log("Firebase initialized successfully");
  
  // Try anonymous sign-in to test auth
  signInAnonymously(testAuth)
    .then(() => {
      console.log("Anonymous auth successful - API key is valid");
    })
    .catch((error) => {
      console.error("Anonymous auth failed:", error.code, error.message);
    });
} catch (error) {
  console.error("Firebase initialization error:", error);
}

// Export for importing in other files
export const testFirebase = () => {
  console.log("Firebase test function called");
};

export default testFirebaseConfig; 