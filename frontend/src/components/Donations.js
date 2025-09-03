import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../output.css";

const donationImages = {
  clothing: "https://img.icons8.com/color/96/shirt.png",
  books: "https://img.icons8.com/color/96/books.png",
  electronics: "https://img.icons8.com/color/96/electronics.png",
  furniture: "https://img.icons8.com/color/96/sofa.png",
  other: "https://img.icons8.com/color/96/miscellaneous.png",
};

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ username: "GuestUser", id: 1 }); // Replace with actual logged-in user ID
  const [showForm, setShowForm] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    pickup_address: "",
    quantity: 1,
    contact_number: "",
    preferred_pickup_time: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/donations/", {
        headers: { "Content-Type": "application/json" },
      });
      setDonations(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  const handleCardClick = (type) => {
    setSelectedType(type);
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/donations/", {
        donor: user.id,
        donation_type: selectedType,
        description: formData.description,
        pickup_address: formData.pickup_address,
        quantity: formData.quantity,
        contact_number: formData.contact_number,
        preferred_pickup_time: formData.preferred_pickup_time,
        status: "pending",
      });
      alert("Donation submitted successfully!");
      setShowForm(false);
      setFormData({
        description: "",
        pickup_address: "",
        quantity: 1,
        contact_number: "",
        preferred_pickup_time: "",
      });
      fetchDonations();
    } catch (err) {
      console.error(err);
      alert("Failed to submit donation.");
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-700">Loading donations...</p>;

  const donationTypes = Object.keys(donationImages);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-8">
              <span className="font-bold text-2xl text-green-700">GreenBandhan</span>
              <div className="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-700 hover:text-green-700 font-medium transition">Home</Link>
                <Link to="/campaigns" className="text-gray-700 hover:text-green-700 font-medium transition">Campaigns</Link>
                <Link to="/parks" className="text-gray-700 hover:text-green-700 font-medium transition">Parks</Link>
                <Link to="/reports" className="text-gray-700 hover:text-green-700 font-medium transition">Reports</Link>
                <Link to="/donations" className="text-green-700 font-semibold border-b-2 border-green-700">Donations</Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <button onClick={handleLogout} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200">
                    Logout
                  </button>
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-200">
                    Profile
                  </button>
                </>
              ) : (
                <Link to="/login" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-green-100 text-center pt-28 pb-16">
        <h2 className="text-4xl font-extrabold text-green-800">Our Donations</h2>
        <p className="text-lg text-gray-700 mt-2">
          Browse through ongoing and past donations from our community.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Donation Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-12">
          {donationTypes.map((type) => (
            <div
              key={type}
              onClick={() => handleCardClick(type)}
              className="bg-white shadow-md rounded-xl p-5 flex flex-col items-center hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer"
            >
              <img src={donationImages[type]} alt={type} className="w-20 h-20 object-contain mb-3" />
              <p className="text-gray-700 font-semibold capitalize">{type}</p>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-6">Latest Donations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {donations.map((donation) => (
            <div key={donation.id} className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
              <img src={donationImages[donation.donation_type] || donationImages["other"]} alt={donation.donation_type} className="w-full h-48 object-contain bg-gray-50" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 capitalize text-green-700">{donation.donation_type}</h3>
                <p className="text-gray-700 mb-1"><span className="font-semibold">Donor:</span> {donation.donor.username}</p>
                {donation.volunteer && <p className="text-gray-700 mb-1"><span className="font-semibold">Volunteer:</span> {donation.volunteer.username}</p>}
                <p className="text-gray-700 mb-1"><span className="font-semibold">Status:</span> {donation.status}</p>
                <p className="text-gray-600 mb-1"><span className="font-semibold">Pickup Address:</span> {donation.pickup_address}</p>
                <p className="text-gray-500 text-sm mt-2">Created at: {new Date(donation.created_at).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Popup Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-green-700">Donate {selectedType}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="w-full border border-gray-300 p-2 rounded-md"
                min={1}
                required
              />
              <input
                type="text"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                placeholder="Contact Number"
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
              <input
                type="datetime-local"
                name="preferred_pickup_time"
                value={formData.preferred_pickup_time}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter donation details"
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
              <textarea
                name="pickup_address"
                value={formData.pickup_address}
                onChange={handleChange}
                placeholder="Enter pickup address"
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donations;
