import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { format } from 'date-fns';
import { FaUsers, FaClipboardList, FaUserCog, FaChartBar, FaTasks, FaUserPlus } from 'react-icons/fa';

const AdminDashboard = () => {
  const { currentUser, currentUserData } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalComplaints: 0,
    resolvedComplaints: 0,
    pendingComplaints: 0,
    totalVolunteers: 0
  });
  const [activeTab, setActiveTab] = useState('users');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    // Verify user is admin
    if (!currentUser || !currentUserData?.permissions?.includes('assign_tasks')) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch users
        const usersQuery = query(
          collection(db, 'users'),
          orderBy('createdAt', 'desc')
        );
        const usersSnapshot = await getDocs(usersQuery);
        const usersData = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          lastLogin: doc.data().lastLogin?.toDate() || null
        }));
        
        setUsers(usersData);
        
        // Fetch volunteers (users with role = volunteer)
        const volunteersData = usersData.filter(user => user.role === 'volunteer');
        setVolunteers(volunteersData);
        
        // Fetch complaints if they exist
        try {
          const complaintsQuery = query(
            collection(db, 'complaints'),
            orderBy('createdAt', 'desc')
          );
          const complaintsSnapshot = await getDocs(complaintsQuery);
          const complaintsData = complaintsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date()
          }));
          
          setComplaints(complaintsData);
          
          // Update stats
          setStats({
            totalUsers: usersData.length,
            totalComplaints: complaintsData.length,
            resolvedComplaints: complaintsData.filter(c => c.status === 'resolved').length,
            pendingComplaints: complaintsData.filter(c => c.status === 'pending').length,
            totalVolunteers: volunteersData.length
          });
        } catch (error) {
          console.error('Error fetching complaints:', error);
          // Continue even if complaints collection doesn't exist yet
          setStats({
            totalUsers: usersData.length,
            totalComplaints: 0,
            resolvedComplaints: 0,
            pendingComplaints: 0,
            totalVolunteers: volunteersData.length
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser, currentUserData, navigate]);

  const handleAssignTask = (complaint) => {
    setSelectedComplaint(complaint);
    setShowAssignModal(true);
  };

  const closeAssignModal = () => {
    setShowAssignModal(false);
    setSelectedComplaint(null);
  };

  // This would actually assign the task, but is currently just mocked UI
  const assignTaskToVolunteer = (volunteerId) => {
    console.log(`Assigning complaint ${selectedComplaint.id} to volunteer ${volunteerId}`);
    // In a real implementation, this would update the Firestore document
    closeAssignModal();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-color"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-secondary-color">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="card bg-primary-light border-l-4 border-primary-color flex items-center p-6">
          <FaUsers className="text-4xl text-primary-dark mr-4" />
          <div>
            <h3 className="text-xl font-bold text-secondary-color">{stats.totalUsers}</h3>
            <p className="text-gray-600">Registered Users</p>
          </div>
        </div>
        
        <div className="card bg-blue-50 border-l-4 border-blue-500 flex items-center p-6">
          <FaClipboardList className="text-4xl text-blue-500 mr-4" />
          <div>
            <h3 className="text-xl font-bold text-secondary-color">{stats.totalComplaints}</h3>
            <p className="text-gray-600">Total Complaints</p>
          </div>
        </div>
        
        <div className="card bg-green-50 border-l-4 border-green-500 flex items-center p-6">
          <FaChartBar className="text-4xl text-green-500 mr-4" />
          <div>
            <h3 className="text-xl font-bold text-secondary-color">{stats.resolvedComplaints}</h3>
            <p className="text-gray-600">Resolved</p>
          </div>
        </div>
        
        <div className="card bg-yellow-50 border-l-4 border-yellow-500 flex items-center p-6">
          <FaUserCog className="text-4xl text-yellow-500 mr-4" />
          <div>
            <h3 className="text-xl font-bold text-secondary-color">{stats.pendingComplaints}</h3>
            <p className="text-gray-600">Pending</p>
          </div>
        </div>
        
        <div className="card bg-purple-50 border-l-4 border-purple-500 flex items-center p-6">
          <FaTasks className="text-4xl text-purple-500 mr-4" />
          <div>
            <h3 className="text-xl font-bold text-secondary-color">{stats.totalVolunteers}</h3>
            <p className="text-gray-600">Volunteers</p>
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-300 mb-6 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('users')}
          className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'users' 
            ? 'text-primary-color border-b-2 border-primary-color' 
            : 'text-gray-600 hover:text-secondary-color'}`}
        >
          Users
        </button>
        <button 
          onClick={() => setActiveTab('complaints')}
          className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'complaints' 
            ? 'text-primary-color border-b-2 border-primary-color' 
            : 'text-gray-600 hover:text-secondary-color'}`}
        >
          Complaints
        </button>
        <button 
          onClick={() => setActiveTab('volunteers')}
          className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'volunteers' 
            ? 'text-primary-color border-b-2 border-primary-color' 
            : 'text-gray-600 hover:text-secondary-color'}`}
        >
          Volunteer Management
        </button>
        <button 
          onClick={() => setActiveTab('assign')}
          className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'assign' 
            ? 'text-primary-color border-b-2 border-primary-color' 
            : 'text-gray-600 hover:text-secondary-color'}`}
        >
          Assign Tasks
        </button>
      </div>
      
      {/* Users Table */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered On</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          {user.photoURL ? (
                            <img className="h-10 w-10 rounded-full" src={user.photoURL} alt="" />
                          ) : (
                            <span className="text-gray-500 font-medium">
                              {`${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`}
                            </span>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          <div className="text-xs text-gray-400">@{user.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${user.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : user.role === 'volunteer'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                        }`}>
                        {user.role || 'user'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.createdAt ? format(user.createdAt, 'MMM dd, yyyy') : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLogin ? format(user.lastLogin, 'MMM dd, yyyy HH:mm') : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.isActive 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Complaints Table */}
      {activeTab === 'complaints' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complaint ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {complaints.map(complaint => (
                  <tr key={complaint.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        #{complaint.id.slice(0, 8)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{complaint.title}</div>
                      <div className="text-xs text-gray-500 truncate max-w-xs">{complaint.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{complaint.userName || 'Anonymous'}</div>
                      <div className="text-xs text-gray-500">{complaint.userEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {complaint.createdAt ? format(complaint.createdAt, 'MMM dd, yyyy') : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        complaint.status === 'resolved' 
                          ? 'bg-green-100 text-green-800' 
                          : complaint.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {complaint.status || 'pending'}
                      </span>
                    </td>
                  </tr>
                ))}
                {complaints.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No complaints found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Volunteer Management */}
      {activeTab === 'volunteers' && (
        <div className="bg-white rounded-lg shadow overflow-hidden p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-secondary-color">Volunteer Management</h2>
            <button className="btn-sm bg-primary-color text-white px-4 py-2 rounded flex items-center">
              <FaUserPlus className="mr-2" /> Add Volunteer
            </button>
          </div>
          
          {volunteers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volunteer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {volunteers.map(volunteer => (
                    <tr key={volunteer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                            {volunteer.photoURL ? (
                              <img className="h-10 w-10 rounded-full" src={volunteer.photoURL} alt="" />
                            ) : (
                              <span className="text-green-500 font-medium">
                                {`${volunteer.firstName?.charAt(0) || ''}${volunteer.lastName?.charAt(0) || ''}`}
                              </span>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {volunteer.firstName} {volunteer.lastName}
                            </div>
                            <div className="text-xs text-gray-500">@{volunteer.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{volunteer.email}</div>
                        <div className="text-xs text-gray-500">{volunteer.phone || 'No phone number'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {volunteer.createdAt ? format(volunteer.createdAt, 'MMM dd, yyyy') : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          volunteer.isActive 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {volunteer.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">View Profile</button>
                        <button className="text-red-600 hover:text-red-900">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <p className="text-blue-700 mb-4">No volunteers registered yet. Add your first volunteer!</p>
              <button className="btn bg-primary-color text-white px-4 py-2 rounded inline-flex items-center">
                <FaUserPlus className="mr-2" /> Add Volunteer
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Assign Tasks */}
      {activeTab === 'assign' && (
        <div className="bg-white rounded-lg shadow overflow-hidden p-6">
          <h2 className="text-xl font-bold text-secondary-color mb-6">Assign Tasks to Volunteers</h2>
          
          {complaints.filter(c => c.status === 'pending').length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complaint</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {complaints.filter(c => c.status !== 'resolved').map(complaint => (
                    <tr key={complaint.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{complaint.title}</div>
                        <div className="text-xs text-gray-500">#{complaint.id.slice(0, 8)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {complaint.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {complaint.createdAt ? format(complaint.createdAt, 'MMM dd, yyyy') : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          complaint.status === 'resolved' 
                            ? 'bg-green-100 text-green-800' 
                            : complaint.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {complaint.status || 'pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {complaint.assignedTo ? (
                          <div className="flex items-center">
                            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                              <span className="text-green-500 font-medium">
                                {(() => {
                                  const assignedVolunteer = users.find(u => u.id === complaint.assignedTo);
                                  return assignedVolunteer 
                                    ? `${assignedVolunteer.firstName?.charAt(0) || ''}${assignedVolunteer.lastName?.charAt(0) || ''}`
                                    : 'UV';
                                })()}
                              </span>
                            </div>
                            <span>{users.find(u => u.id === complaint.assignedTo)?.firstName || 'Unknown'}</span>
                          </div>
                        ) : (
                          <span className="text-red-500">Not assigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => handleAssignTask(complaint)}
                          className="bg-primary-color text-white px-3 py-1 rounded text-sm hover:bg-primary-dark transition-colors"
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No pending complaints to assign.</p>
            </div>
          )}
        </div>
      )}
      
      {/* Assign Task Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-secondary-color mb-4">
              Assign Task to Volunteer
            </h3>
            <p className="mb-2 text-gray-600">
              <span className="font-medium">Complaint:</span> {selectedComplaint.title}
            </p>
            <p className="mb-4 text-gray-600">
              <span className="font-medium">Location:</span> {selectedComplaint.location}
            </p>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Select a volunteer:</label>
              {volunteers.length > 0 ? (
                <select 
                  className="form-control"
                  defaultValue=""
                >
                  <option value="" disabled>Choose a volunteer</option>
                  {volunteers.map(volunteer => (
                    <option key={volunteer.id} value={volunteer.id}>
                      {volunteer.firstName} {volunteer.lastName} ({volunteer.email})
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-red-500">No volunteers available. Add volunteers first.</p>
              )}
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={closeAssignModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => assignTaskToVolunteer('someVolunteerId')}
                className="px-4 py-2 bg-primary-color text-white rounded hover:bg-primary-dark transition-colors"
                disabled={volunteers.length === 0}
              >
                Assign Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 