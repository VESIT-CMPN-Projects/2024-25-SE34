import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import VolunteerLogin from './components/volunteer/VolunteerLogin';
import VolunteerApplication from './components/volunteer/VolunteerApplication';
import RegisterComplaint from './components/complaints/RegisterComplaint';
import SimpleForm from './components/complaints/SimpleForm';
import ComplaintLanding from './components/complaints/ComplaintLanding';
import AdminDashboard from './components/admin/AdminDashboard';
import CreateAdminUser from './components/auth/CreateAdminUser';
import PrivateRoute from './components/auth/PrivateRoute';
import { useAuth } from './contexts/AuthContext';
import DirectAdminAccess from './components/admin/DirectAdminAccess';
import './App.css';

// ScrollToTop component to reset scroll position on page navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const { currentUser, userRole, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && currentUser && userRole) {
      // Only redirect if user is on login or signup page
      if (['/login', '/signup', '/volunteer-login'].includes(location.pathname)) {
        if (userRole === 'admin') {
          navigate('/admin'); // Admins go to AdminDashboard
        } else {
          navigate('/'); // Regular users go to Home
        }
      }
    }
  }, [loading, currentUser, userRole, navigate, location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/media" element={<Home />} />
          <Route path="/reach" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/volunteer-login" element={<VolunteerLogin />} />
          <Route path="/volunteer-application" element={<VolunteerApplication />} />
          <Route 
            path="/complaints" 
            element={<SimpleForm />} 
          />
          <Route
            path="/complaint-landing"
            element={<ComplaintLanding />}
          />
          
          {/* Direct access to Admin Dashboard without authentication */}
          <Route path="/direct-admin" element={<DirectAdminAccess />} />
          
          {/* Admin Routes - Use PrivateRoute to protect admin pages */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/create"
            element={
              <PrivateRoute>
                <CreateAdminUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-admin"
            element={
              <PrivateRoute>
                <CreateAdminUser />
              </PrivateRoute>
            }
          />
          
          {/* Volunteer Dashboard - Redirect to Admin Dashboard */}
          <Route
            path="/volunteer-dashboard"
            element={<Navigate to="/admin" replace />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;