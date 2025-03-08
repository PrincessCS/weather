exports.handler = async (event) => {
    const API_KEY = process.env.MY_WEATHER_API_KEY; // Fetch from Netlify environment variables
    const city = event.queryStringParameters.city || "London";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch weather data" })
        };
    }
};
