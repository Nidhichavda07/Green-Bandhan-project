import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Parks = () => {
  const [parks, setParks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/');
      return;
    }

    const fetchParks = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch('http://127.0.0.1:8000/api/parks/', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Failed to fetch parks');
        const data = await response.json();
        setParks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchParks();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-4xl font-bold text-center mb-10 text-green-700">Parks</h2>
      <div className="max-w-6xl mx-auto">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading ? (
          <p className="text-gray-600">Loading parks...</p>
        ) : parks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {parks.map((park) => (
              <div
                key={park.id}
                className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-green-700">{park.name}</h3>
                <p className="text-gray-600">{park.description}</p>
                <p className="text-gray-600">
                  <span className="font-medium">Location:</span> {park.location}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No parks found.</p>
        )}
      </div>
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

export default Parks;