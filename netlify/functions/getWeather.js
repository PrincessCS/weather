const fetch = require('node-fetch'); 

exports.handler = async function (event) {
    const API_KEY = process.env.WEATHER_API_KEY;
    const { city } = event.queryStringParameters;

    if (!API_KEY) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Missing API Key in environment variables." }),
        };
    }

    if (!city) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "City is required" }),
        };
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch weather data. Status: ${response.status}`);
        }

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error("Error fetching data:", error.message);

        return {
            statusCode: error.response ? error.response.status : 500,
            body: JSON.stringify({ error: error.message || "Error fetching data" }),
        };
    }
};
