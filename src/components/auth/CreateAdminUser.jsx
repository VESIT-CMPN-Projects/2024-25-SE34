import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase'; // Updated path

const CreateAdminUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user's display name
      await updateProfile(user, { displayName });

      // Save user data to Firestore with admin role
      const userId = user.uid;
      const timestamp = new Date();
      await setDoc(doc(db, 'users', userId), {
        email,
        displayName,
        role: 'admin',
        permissions: [
          'read_all_data',
          'create_complaints',
          'update_complaints',
          'delete_complaints',
          'manage_users',
          'manage_volunteers',
          'assign_tasks',
          'access_admin_dashboard',
          'view_analytics',
          'manage_assignments',
          'approve_volunteers',
          'create_admins',
        ],
        createdAt: timestamp,
        lastLogin: timestamp,
        isAdmin: true,
        isActive: true,
        metadata: {
          createdAt: timestamp,
          lastLogin: timestamp,
          lastUpdated: timestamp,
        },
      });

      setMessage('Admin user created successfully!');
      setTimeout(() => navigate('/admin'), 2000);
    } catch (error) {
      setMessage('Error creating admin user: ' + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="card w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-6">Create Admin User</h2>
        {message && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="displayName" className="form-label">Display Name</label>
            <input
              type="text"
              id="displayName"
              className="form-control"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full py-2">
            Create Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAdminUser;