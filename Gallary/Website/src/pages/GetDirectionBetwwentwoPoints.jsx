import { useState } from "react";
import { GoogleMap, DirectionsRenderer, useJsApiLoader } from "@react-google-maps/api";

const GetDirectionBetweenTwoPoints = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA6vC0ktChHZy02ZhUf8j-Y3M8NMC2lqwo",
  });

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [waypoints, setWaypoints] = useState([]);
  const [waypointsInput, setWaypointsInput] = useState("");
  const [directions, setDirections] = useState(null);
  const [totalDistance, setTotalDistance] = useState(null);
  const [totalDuration, setTotalDuration] = useState(null);
  const [waypointDistances, setWaypointDistances] = useState({});
  const [showRoute, setShowRoute] = useState(false);

  // Add waypoint
  const handleAddWaypoint = () => {
    if (waypointsInput.trim() !== "") {
      const newWaypoint = { location: waypointsInput.trim(), stopover: true };
      setWaypoints([...waypoints, newWaypoint]);
      setWaypointsInput("");

      // Calculate distance from origin to this waypoint
      if (origin) {
        calculateWaypointDistance(origin, newWaypoint.location);
      }
    }
  };

  // Edit waypoint
  const handleEditWaypoint = (index, newValue) => {
    const updatedWaypoints = [...waypoints];
    updatedWaypoints[index] = { location: newValue, stopover: true };
    setWaypoints(updatedWaypoints);

    // Recalculate distance from origin to updated waypoint
    if (origin) {
      calculateWaypointDistance(origin, newValue);
    }
  };

  // Delete waypoint
  const handleDeleteWaypoint = (index) => {
    const updatedWaypoints = waypoints.filter((_, i) => i !== index);
    setWaypoints(updatedWaypoints);

    // Remove distance from state
    const updatedDistances = { ...waypointDistances };
    delete updatedDistances[waypoints[index].location];
    setWaypointDistances(updatedDistances);
  };

  // Calculate distance from origin to waypoint
  const calculateWaypointDistance = (start, waypoint) => {
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: start,
        destination: waypoint,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          const distance = result.routes[0].legs[0].distance.text;
          setWaypointDistances((prev) => ({ ...prev, [waypoint]: distance }));
        } else {
          console.error("Error calculating waypoint distance:", status);
        }
      }
    );
  };

  // Calculate full route
  const calculateRoute = () => {
    if (!origin || !destination) {
      alert("Please enter both origin and destination");
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
          setShowRoute(true); // Show the route on the map

          // Calculate total distance and duration
          let totalDistance = 0;
          let totalDuration = 0;
          result.routes[0].legs.forEach((leg) => {
            totalDistance += leg.distance.value;
            totalDuration += leg.duration.value;
          });

          setTotalDistance((totalDistance / 1000).toFixed(2)); // Convert meters to km
          setTotalDuration((totalDuration / 3600).toFixed(2)); // Convert seconds to hours
        } else {
          console.error("Directions request failed:", status);
        }
      }
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Route Distance Calculation</h2>
      
      <input
        type="text"
        placeholder="Enter Origin"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      
      <input
        type="text"
        placeholder="Enter Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      
      <div className="flex">
        <input
          type="text"
          placeholder="Enter Waypoint"
          value={waypointsInput}
          onChange={(e) => setWaypointsInput(e.target.value)}
          className="border p-2 flex-1"
        />
        <button onClick={handleAddWaypoint} className="bg-blue-500 text-white px-4 py-2 ml-2">
          Add
        </button>
      </div>
      
      {/* Display waypoints */}
      <ul className="mt-2">
        {waypoints.map((wp, index) => (
          <li key={index} className="flex items-center justify-between border p-2 mt-1">
            <input
              type="text"
              value={wp.location}
              onChange={(e) => handleEditWaypoint(index, e.target.value)}
              className="border p-1 flex-1"
            />
            <span className="mx-2 text-sm text-gray-500">
              {waypointDistances[wp.location] ? `${waypointDistances[wp.location]} from ${origin}` : "Calculating..."}
            </span>
            <button onClick={() => handleDeleteWaypoint(index)} className="bg-red-500 text-white px-2 py-1 ml-2">
              Delete
            </button>
          </li>
        ))}
      </ul>

      <button onClick={calculateRoute} className="bg-green-500 text-white px-4 py-2 w-full mt-4">
        Show Route
      </button>

      {/* Display total distance and duration */}
      {totalDistance && (
        <div className="mt-4 text-lg">
          <strong>Total Distance:</strong> {totalDistance} km | <strong>Total Duration:</strong> {totalDuration} hr
        </div>
      )}

      {/* Show map with route only if user clicks "Show Route" */}
      {isLoaded && showRoute && (
        <GoogleMap
          center={{ lat: 28.5, lng: 77.1 }}
          zoom={5}
          mapContainerStyle={{ height: "400px", width: "100%" }}
        >
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      )}
    </div>
  );
};

export default GetDirectionBetweenTwoPoints;
