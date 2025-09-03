// Campaigns.js
import React, { useState, useEffect } from "react";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/campaigns/");
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
    fetchCampaigns();
  }, []);

  const handleParticipate = (campaignId) => {
    alert(`✅ You have requested to participate in campaign ID: ${campaignId}`);
    // Later: send POST request to backend for participation
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
        🌍 Environmental Campaigns
      </h2>

      {campaigns.length === 0 ? (
        <p className="text-center text-gray-500">No campaigns available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white shadow-md rounded-lg p-6 border hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-green-700">
                {campaign.title}
              </h3>
              <p className="text-gray-600 mt-2">{campaign.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                📅 {campaign.start_date} → {campaign.end_date}
              </p>
              <p className="text-sm text-gray-500">📍 {campaign.location}</p>
              <p className="text-sm text-gray-500">
                👥 Max Volunteers: {campaign.max_volunteers}
              </p>
              <p className="text-sm text-gray-400">
                Organized by: <b>{campaign.organizer_name}</b>
              </p>

              {campaign.is_active ? (
                <button
                  onClick={() => handleParticipate(campaign.id)}
                  className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
                >
                  ✅ Participate
                </button>
              ) : (
                <p className="mt-4 text-red-500 font-semibold text-center">
                  🚫 This campaign is closed
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Campaigns;
