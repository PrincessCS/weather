const cityNameVisible = document.querySelector('.location-search-visible input');
const cityNameHidden = document.querySelector('.location-search-hidden input');
const weatherDescription = document.getElementById("weather-description");
const cityTemperatureMax = document.getElementById("temperature-max");
const cityTemperatureMin = document.getElementById("temperature-min");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const latitude = document.getElementById("coordinates-lat");
const longitude = document.getElementById("coordinates-long");
const searchBtns = document.querySelectorAll(".search-icon");
const weatherIcons = document.querySelectorAll(".weather-icons");
const alertError = document.getElementById("alert");
const selectedCityTemp = document.getElementById("selected-city-temp");
const feelsLike = document.getElementById("feels-like");
const selectedCityName = document.getElementById("selected-city-name");
const date = document.getElementById("date");


function getActiveCityName() {
    const visibleInput = window.getComputedStyle(cityNameVisible.parentElement).display !== 'none' ? cityNameVisible : cityNameHidden;
    return visibleInput.value.trim();
}

function getCityWeather(e) {
    e.preventDefault();
    const city = getActiveCityName();
    if (!city) {
        alertError.textContent = 'Please enter a city name!';
        alertError.style.color = "red";
        return;
    }

    const url = `/.netlify/functions/getWeather?city=${city}`;


    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Network Response Error");
        }
        return response.json();
    })
    .then(data => {
        console.log("Weather Data: ", data);
       
        alertError.textContent = ''; 
       
        function formatDecimalDegrees(coord, isLatitude) {
            const direction = isLatitude 
                ? (coord >= 0 ? 'N' : 'S') 
                : (coord >= 0 ? 'E' : 'W');
        
            return `${Math.abs(coord)}° ${direction}`;
        }
        
        // Fetching and formatting coordinates
        latitude.textContent = `Latitude: ${formatDecimalDegrees(data.coord.lat, true)}`;
        longitude.textContent = `Longitude: ${formatDecimalDegrees(data.coord.lon, false)}`;

        const description = data.weather[0].description.toUpperCase().trim();
        weatherDescription.textContent = description;

        const weatherImages = {
            "MODERATE RAIN": "moderate-rain.jpg",
            "LIGHT RAIN":  "light-rain.jpg",
            "OVERCAST CLOUDS": "overcast-clouds.jpg",
            "THUNDERSTORM": "thunderstorm.jpg",
            "FEW CLOUDS": "few-clouds.jpg",
            "CLEAR SKY": "clear-sky.jpg",
            "SCATTERED CLOUDS": "scattered-clouds.jpg",
            "BROKEN CLOUDS": "scattered-clouds.jpg",
            "MIST": "mist.jpg",
        };
          
        document.body.style.backgroundImage = `url('Assets/${weatherImages[description] || 'default.jpg'}')`;
        document.body.style.backgroundSize = "cover";

        cityTemperatureMax.textContent = `Temp Max: ${data.main.temp_max}°C`;
        cityTemperatureMin.textContent = `Temp Min: ${data.main.temp_min}°C`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeed.textContent = `Wind Speed: ${data.wind.speed}km/h`;
        selectedCityTemp.textContent = `${data.main.temp}°C`;
        feelsLike.textContent = `Feels Like: ${data.main.feels_like}°C`;
        selectedCityName.textContent = data.name;

        const currentDate = new Date();
        date.textContent = currentDate.toLocaleDateString('en-GB') + " " + currentDate.toLocaleTimeString();

        weatherIcons.forEach(icon => {
            icon.style.display = "inline-block";
        });
    })
    .catch(error => {
        console.error("Error: ", error);
        alertError.textContent = 'Error fetching weather data. Please try again.';
        alertError.style.color = "red";
    });
}


searchBtns.forEach(btn => {
    btn.addEventListener("click", getCityWeather);
});

cityNameVisible.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        getCityWeather(e);
    }
});

cityNameHidden.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        getCityWeather(e);
    }
});