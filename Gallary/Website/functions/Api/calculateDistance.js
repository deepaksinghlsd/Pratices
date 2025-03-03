import { https } from 'firebase-functions';
import axios from 'axios';

const API_Key = "AIzaSyA6vC0ktChHZy02ZhUf8j-Y3M8NMC2lqwo"

export const calculateDistance = https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET');

    try {
        const {origins, destinations} = req.query;
        console.log("Origins:", origins);
        console.log("Destinations:",
        destinations);
        console.log(`----request query: ${req.query}`);
        
        
        if(!origins || !destinations) {
            throw new Error("Origins and destination are requireds");
        }
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origins}&destinations=${destinations}&key=${API_Key}`;
        const response = await axios.get(url);
        return res.json(response.data);
    } catch (error) {
        console.error("Error fetching distance:", error.response ? error.response.data : error.message);
    }
})