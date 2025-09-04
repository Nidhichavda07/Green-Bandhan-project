import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [showDonations, setShowDonations] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch users
  useEffect(() => {
    if (showUsers) {
      const fetchUsers = async () => {
        setLoading(true);
        setError('');
        try {
          const response = await fetch('http://127.0.0.1:8000/api/users/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) throw new Error('Failed to fetch users');
          const data = await response.json();
          setUsers(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchUsers();
    }
  }, [showUsers]);

  // Fetch donation campaigns
  useEffect(() => {
    if (showDonations) {
      const fetchDonations = async () => {
        setLoading(true);
        setError('');
        try {
          const response = await fetch('http://127.0.0.1:8000/api/donations/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) throw new Error('Failed to fetch donations');
          const data = await response.json();
          setDonations(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchDonations();
    }
  }, [showDonations]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-4xl font-bold text-center mb-10 text-green-700">
        Admin Dashboard
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Admin Info Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Admin Profile</h3>
          <div className="space-y-3">
            <p className="text-gray-700">
              <span className="font-medium">Username:</span> {user.username}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Role:</span> {user.role}
            </p>
            {user.address && (
              <p className="text-gray-700">
                <span className="font-medium">Address:</span> {user.address}
              </p>
            )}
          </div>
        </div>

        {/* Users Management Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Manage Users</h3>
          <p className="text-gray-600 mb-4">View and manage all registered users.</p>
          <button
            onClick={() => setShowUsers(!showUsers)}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            {showUsers ? 'Hide Users' : 'View All Users'}
          </button>
          {showUsers && (
            <div className="mt-6">
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {loading ? (
                <p className="text-gray-600">Loading users...</p>
              ) : users.length > 0 ? (
                <div className="space-y-4">
                  {users.map((u) => (
                    <div
                      key={u.username}
                      className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition"
                    >
                      <h4 className="text-lg font-semibold text-green-700">{u.username}</h4>
                      <p className="text-gray-600">
                        <span className="font-medium">Role:</span> {u.role}
                      </p>
                      {u.address && (
                        <p className="text-gray-600">
                          <span className="font-medium">Address:</span> {u.address}
                        </p>
                      )}
                      {u.phone && (
                        <p className="text-gray-600">
                          <span className="font-medium">Phone:</span> {u.phone}
                        </p>
                      )}
                      {u.age && (
                        <p className="text-gray-600">
                          <span className="font-medium">Age:</span> {u.age}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No users found.</p>
              )}
            </div>
          )}
        </div>

        {/* Donation Campaigns Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Donation Campaigns</h3>
          <p className="text-gray-600 mb-4">Manage donation campaigns for park initiatives.</p>
          <button
            onClick={() => setShowDonations(!showDonations)}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
          >
            {showDonations ? 'Hide Campaigns' : 'View Campaigns'}
          </button>
          {showDonations && (
            <div className="mt-6">
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {loading ? (
                <p className="text-gray-600">Loading campaigns...</p>
              ) : donations.length > 0 ? (
                <div className="space-y-4">
                  {donations.map((donation) => (
                    <div
                      key={donation.id}
                      className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition"
                    >
                      <h4 className="text-lg font-semibold text-green-700">{donation.title}</h4>
                      <p className="text-gray-600">{donation.description}</p>
                      <p className="text-gray-600">
                        <span className="font-medium">Amount:</span> ${donation.amount}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Date:</span> {donation.date}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No donation campaigns found.</p>
              )}
            </div>
          )}
        </div>

        {/* Parks Management Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Manage Parks</h3>
          <p className="text-gray-600 mb-4">View and manage park details.</p>
          <button
            onClick={() => navigate('/parks')}
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition"
          >
            View Parks
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <div className="max-w-md mx-auto mt-10">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;