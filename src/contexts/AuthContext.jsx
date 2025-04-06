import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

// Create the auth context with default values
const AuthContext = createContext({
  currentUser: null,
  userRole: null,
  loading: true,
  signup: async () => {},
  login: async () => {},
  logout: async () => {}
});

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component to wrap our app and make auth object available throughout
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to handle user registration
  const signup = async (email, password, displayName) => {
    console.log('AuthContext: Signup function called with', { email, displayName });
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('AuthContext: User created successfully', userCredential);
      
      // Add display name to the user profile
      if (userCredential.user) {
        console.log('AuthContext: Updating user profile with displayName:', displayName);
        await updateProfile(userCredential.user, {
          displayName: displayName
        });
        console.log('AuthContext: User profile updated successfully');
        return userCredential;
      }
    } catch (error) {
      console.error('AuthContext: Error in signup function:', error);
      throw error;
    }
  };

  // Function to handle user login
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Fetch user role from Firestore
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    if (userDoc.exists()) {
      setUserRole(userDoc.data().role);
    }
    return userCredential;
  };

  // Function to handle user logout
  const logout = async () => {
    await signOut(auth);
    setUserRole(null);
  };

  // Set up an observer to watch for auth state changes
  useEffect(() => {
    console.log('AuthContext: Setting up auth state observer');
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('AuthContext: Auth state changed, user:', user);
      
      if (user) {
        // Fetch user role from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role);
          } else {
            console.log('No user document found in Firestore');
            setUserRole('user'); // Default to user role if no document exists
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
          setUserRole('user'); // Default to user role on error
        }
      } else {
        setUserRole(null);
      }
      
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Value object to be provided to consumers of this context
  const value = {
    currentUser,
    userRole,
    loading,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 