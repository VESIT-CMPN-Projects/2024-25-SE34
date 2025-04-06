import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Updated path
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Updated path

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      if (!currentUser) {
        console.log('PrivateRoute: No user found, redirecting to login');
        setIsAuthorized(false);
        setLoading(false);
        return;
      }

      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role;
        
        // Check if user is admin or volunteer
        if (role === 'admin' || role === 'volunteer' || 
            (userData.permissions && 
             (userData.permissions.includes('manage_volunteers') || 
              userData.permissions.includes('assign_tasks')))) {
          console.log('PrivateRoute: User authorized with role:', role);
          setIsAuthorized(true);
        } else {
          console.log('PrivateRoute: User not authorized with role:', role);
          setIsAuthorized(false);
        }
      } else {
        console.log('PrivateRoute: User document not found');
        setIsAuthorized(false);
      }
      setLoading(false);
    };

    checkUserRole();
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser || !isAuthorized) {
    // Redirect to login page instead of home
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;