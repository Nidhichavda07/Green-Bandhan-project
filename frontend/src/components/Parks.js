// Parks.js
import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const GOOGLE_API_KEY = "";

const mapContainerStyle = {
  width: "100%",
  height: "600px",
};

const Parks = ({ user }) => {
  const [center, setCenter] = useState({ lat: 23.0225, lng: 72.5714 }); // Default Ahmedabad
  const [parks, setParks] = useState([]);
  const [selectedPark, setSelectedPark] = useState(null);

  // Sample parks data (you can replace with API call)
  const allParks = [
    { name: "Vastral Park", lat: 23.0415, lng: 72.6350 },
    { name: "Vastral Garden", lat: 23.0380, lng: 72.6325 },
    { name: "Thaltej Park", lat: 23.0600, lng: 72.5300 },
    { name: "Navrangpura Park", lat: 23.0350, lng: 72.5250 },
  ];

  // Function to calculate distance between two coordinates
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Get user's coordinates from address using Geocoding API
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            user.address
          )}&key=${GOOGLE_API_KEY}`
        );
        const data = await response.json();
        if (data.status === "OK") {
          const location = data.results[0].geometry.location;
          setCenter(location);

          // Filter parks within 10 km
          const nearbyParks = allParks.filter((park) => {
            const distance = getDistanceFromLatLonInKm(
              location.lat,
              location.lng,
              park.lat,
              park.lng
            );
            return distance <= 10;
          });
          setParks(nearbyParks);
        } else {
          console.error("Geocoding failed:", data.status);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (user.address) fetchUserLocation();
  }, [user.address]);

  return (
    <div className="min-h-screen">
      <LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={13}>
          {parks.map((park, index) => (
            <Marker
              key={index}
              position={{ lat: park.lat, lng: park.lng }}
              onClick={() => setSelectedPark(park)}
            />
          ))}
          {selectedPark && (
            <InfoWindow
              position={{ lat: selectedPark.lat, lng: selectedPark.lng }}
              onCloseClick={() => setSelectedPark(null)}
            >
              <div>
                <h3 className="font-bold">{selectedPark.name}</h3>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Parks;
