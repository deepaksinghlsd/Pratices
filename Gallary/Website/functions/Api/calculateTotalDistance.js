import { https } from "firebase-functions";
import axios from "axios";

export const calculateTotalDistance = https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.set('Access-Control-Allow-Headers', 'content-type');
    try {
        const { origin, destination, waypoints } = req.query;

        console.log("origin:", origin);
        console.log("destination:", destination);
        console.log("waypoints (raw):", waypoints);

        // Ensure waypoints is always an array
        let waypointsArray = [];
        if (typeof waypoints === "string") {
            waypointsArray = waypoints.split(",");
        } else if (Array.isArray(waypoints)) {
            waypointsArray = waypoints;
        }

        console.log("waypoints (processed):", waypointsArray);

        const apiKey = "AIzaSyA6vC0ktChHZy02ZhUf8j-Y3M8NMC2lqwo";
        if (!origin || !destination) {
            return res.status(400).send(`Missing required parameters: origin=${origin}, destination=${destination}`);
        }

        const waypointsString = waypointsArray.length > 0 ? `waypoints=${waypointsArray.join("|")}` : "";
        console.log("waypointsString:", waypointsString);

        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&${waypointsString}&key=${apiKey}`;
        console.log("API Request URL:", url);

        const response = await axios.get(url);

        if (response.data.status !== "OK") {
            console.error("Google Maps API Error:", response.data);
            return res.status(400).send("Error fetching distance from Google Maps API");
        }

        const route = response.data.routes[0];
        const totalDistance = (route.legs.reduce((sum, leg) => sum + leg.distance.value, 0) / 1000).toFixed(2) // Convert to km
        const totalDuration = (route.legs.reduce((sum, leg) => sum + leg.duration.value, 0) / 3600).toFixed(2)// Convert to hours

        return res.json({ totalDistance: `${totalDistance}`, totalDuration: `${totalDuration}`, route: route });
    } catch (error) {
        console.error("Error fetching distance:", error.response ? error.response.data : error.message);
        return res.status(500).send("Internal Server Error");
    }
});
