import { useEffect, useState } from "react";
import { getLocation } from "../firebase/location";
import axios from "axios";
import { GoogleMap, LoadScript, DirectionsRenderer } from "@react-google-maps/api";

const LocationPage = () => {
  const [locations, setLocations] = useState([]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [directions, setDirections] = useState(null);

  const googleMapsApiKey = "AIzaSyA6vC0ktChHZy02ZhUf8j-Y3M8NMC2lqwo" // Replace with your actual API key

  useEffect(() => {
    const fetchLocations = async () => {
      const data = await getLocation();
      setLocations(data);
    };
    fetchLocations();
  }, []);

  const calculateDis = async () => {
    if (!origin || !destination) {
      alert("Please select both origin and destination");
      return;
    }

    const originCoords = locations.find((loc) => loc.id === origin);
    const destinationCoords = locations.find((loc) => loc.id === destination);

    if (!originCoords || !destinationCoords) {
      alert("Invalid locations selected");
      return;
    }

    const originString = `${originCoords.lat},${originCoords.log}`;
    const destinationString = `${destinationCoords.lat},${destinationCoords.log}`;

    // Fetch distance and duration from Firebase Cloud Function
    const url = `https://us-central1-prjdeepak-52038.cloudfunctions.net/calculateDistance?origins=${originString}&destinations=${destinationString}`;

    try {
      const response = await axios.get(url);
      if (response.data.rows[0].elements[0].status === "OK") {
        const distanceInMeters = response.data.rows[0].elements[0].distance.value;
        setDistance(distanceInMeters / 1000); // Convert to km
        const durationInSeconds = response.data.rows[0].elements[0].duration.value;
        setDuration(durationInSeconds / 3600); // Convert to hours
      } else {
        console.error("Error: Invalid response data", response.data);
      }
    } catch (error) {
      console.error("Error fetching distance:", error.response ? error.response.data : error.message);
    }

    // Fetch directions from Google Maps Directions API
    const directionsService = new window.google.maps.DirectionsService();
    console.log("Directions Service:", directionsService );
    
    directionsService.route(
      {
        origin: originString,
        destination: destinationString,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-xl font-bold text-center">Shortest Path & Map View</h1>

      {/* Dropdown for Origin */}
      <div className="space-y-4">
        <label className="block text-gray-700 font-medium">Start From:</label>
        <select
          className="w-full p-2 border rounded"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        >
          <option value="">Select Origin</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>{location.id}</option>
          ))}
        </select>
      </div>

      {/* Dropdown for Destination */}
      <div className="space-y-4">
        <label className="block text-gray-700 font-medium">To:</label>
        <select
          className="w-full p-2 border rounded"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        >
          <option value="">Select Destination</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>{location.id}</option>
          ))}
        </select>
      </div>

      {/* Calculate Distance Button */}
      <button
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        onClick={calculateDis}
      >
        Find Shortest Path
      </button>

      {/* Display Distance and Duration */}
      {distance !== null && (
        <div className="mt-4 text-center text-lg font-semibold">
          Distance: {distance.toFixed(2)} km | Duration: {duration.toFixed(2)} hr
        </div>
      )}

      {/* Google Map */}
      <div className="mt-4 h-96">
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
          <GoogleMap
            center={{ lat: 28.5, lng: 77.1 }} // Default center (change as needed)
            zoom={10}
            mapContainerStyle={{ width: "100%", height: "100%" }}
          >
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default LocationPage;
