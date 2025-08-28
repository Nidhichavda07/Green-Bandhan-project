import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../output.css";

// Static category data
const issueCategories = [
  { type: "garbage", name: "Garbage", icon: "https://img.icons8.com/color/96/garbage.png", description: "Report uncollected garbage or waste." },
  { type: "recycling", name: "Recycling", icon: "https://img.icons8.com/color/96/recycle.png", description: "Report recycling issues or missed pickups." },
  { type: "water", name: "Water Issue", icon: "https://img.icons8.com/color/96/water.png", description: "Report water leakage or contamination." },
  { type: "other", name: "Other", icon: "https://img.icons8.com/color/96/miscellaneous.png", description: "Report other environmental concerns." },
];

// Static reports
const staticReports = [
  { id: 1, title: "Garbage piling up", reporter: "Alice", status: "Pending", location: "Sector 5", issue_type: "garbage", created_at: "2025-08-28T10:00:00" },
  { id: 2, title: "Water leakage", reporter: "Bob", status: "Resolved", location: "Sector 9", issue_type: "water", created_at: "2025-08-27T14:30:00" },
  { id: 3, title: "Recycling not collected", reporter: "Charlie", status: "Pending", location: "Sector 2", issue_type: "recycling", created_at: "2025-08-26T09:15:00" },
];

const WasteReport = ({ user }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    issue_type: "",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can connect your backend API to actually submit the report
    alert(`Report submitted!\nTitle: ${formData.title}\nCategory: ${formData.issue_type}`);
    setShowForm(false);
    setFormData({ title: "", description: "", location: "", issue_type: "" });
  };

  const handleLogout = () => {
    window.location.reload();
  };

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
                <Link to="/wastereport" className="text-green-700 font-semibold border-b-2 border-green-700">Reports</Link>
                <Link to="/donations" className="text-gray-700 hover:text-green-700 font-medium transition">Donations</Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* <span className="text-gray-700 font-medium">Hello, {user.username}</span> */}
              <button onClick={handleLogout} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200">Logout</button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-200">Profile</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-green-100 text-center pt-20 pb-12">
        <h2 className="text-4xl font-extrabold text-green-800">Waste Reports</h2>
        <p className="text-lg text-gray-700 mt-2">Submit and view environmental issues in your area.</p>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Category Cards */}
        <h3 className="text-2xl font-bold text-green-700 mb-6">Report by Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {issueCategories.map(cat => (
            <div
              key={cat.type}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-2xl cursor-pointer transition transform hover:-translate-y-2"
              onClick={() => setFormData({ ...formData, issue_type: cat.name }) || setShowForm(true)}
            >
              <img src={cat.icon} alt={cat.name} className="w-24 h-24 mb-4" />
              <h4 className="text-xl font-semibold mb-2 text-green-700">{cat.name}</h4>
              <p className="text-gray-600">{cat.description}</p>
            </div>
          ))}
        </div>

        {/* Recent Reports */}
        <h3 className="text-2xl font-bold text-green-700 mb-6">Recent Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {staticReports.map(report => (
            <div key={report.id} className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition transform hover:-translate-y-2">
              <h3 className="text-xl font-bold mb-2 capitalize text-green-700">{report.title}</h3>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Reporter:</span> {report.reporter}</p>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Status:</span> {report.status}</p>
              <p className="text-gray-600 mb-1"><span className="font-semibold">Location:</span> {report.location}</p>
              <p className="text-gray-500 text-sm mt-2">Reported at: {new Date(report.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Popup Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-green-700">Submit Waste Report</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded-md" required />
              <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded-md" required />
              <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="w-full border p-2 rounded-md" required />
              <select name="issue_type" value={formData.issue_type} onChange={handleChange} className="w-full border p-2 rounded-md">
                {issueCategories.map(cat => (<option key={cat.type} value={cat.name}>{cat.name}</option>))}
              </select>
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

export default WasteReport;
