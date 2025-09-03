// Parks.js
import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY || "";

const mapContainerStyle = {
  width: "100%",
  height: "600px",
};

const Parks = () => {
  const [center, setCenter] = useState({ lat: 23.0225, lng: 72.5714 }); // Default Ahmedabad
  const [parks, setParks] = useState([]);
  const [selectedPark, setSelectedPark] = useState(null);

  // ✅ Fetch parks from Django backend
  useEffect(() => {
    const fetchParks = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/parks/");
        const data = await response.json();
        setParks(data);

        if (data.length > 0) {
          setCenter({ lat: data[0].latitude, lng: data[0].longitude });
        }
      } catch (error) {
        console.error("Error fetching parks:", error);
      }
    };

    fetchParks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
        🌳 Explore Nearby Parks
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side: Park info cards */}
        <div className="space-y-4">
          {parks.map((park) => (
            <div
              key={park.id}
              className="bg-white shadow-md rounded-lg p-5 border hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-green-700">{park.name}</h3>
              <p className="text-gray-600 mt-2">{park.description}</p>
              <p className="mt-2 text-sm text-gray-500">
                🌱 Oxygen Rating: <b>{park.oxygen_rating}/10</b>
              </p>
              <p className="mt-1 text-sm text-gray-500">✨ {park.features}</p>
              {park.address && (
                <p className="mt-1 text-sm text-gray-400">📍 {park.address}</p>
              )}

              <button
                onClick={() => {
                  setCenter({ lat: park.latitude, lng: park.longitude });
                  setSelectedPark(park);
                }}
                className="mt-3 text-green-600 font-semibold hover:underline"
              >
                📍 Show on Map
              </button>
            </div>
          ))}
        </div>

        {/* Right side: Google Map */}
        <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-md">
          {GOOGLE_API_KEY ? (
            <LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
              <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={13}>
                {parks.map((park) => (
                  <Marker
                    key={park.id}
                    position={{ lat: park.latitude, lng: park.longitude }}
                    onClick={() => setSelectedPark(park)}
                  />
                ))}

                {selectedPark && (
                  <InfoWindow
                    position={{
                      lat: selectedPark.latitude,
                      lng: selectedPark.longitude,
                    }}
                    onCloseClick={() => setSelectedPark(null)}
                  >
                    <div>
                      <h3 className="font-bold text-green-700">{selectedPark.name}</h3>
                      <p className="text-gray-600">{selectedPark.description}</p>
                      <p className="text-sm">🌱 Oxygen: {selectedPark.oxygen_rating}/10</p>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          ) : (
            <p className="text-center text-red-600 py-6">
              ⚠️ Google Maps API key not set. Add <code>REACT_APP_GOOGLE_API_KEY</code> in <b>.env</b>.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Parks;
