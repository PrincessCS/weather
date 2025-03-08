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

    // Fetch weather data from Netlify Function
    fetch(`/.netlify/functions/getWeather?city=${city}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network Response Error");
            }
            return response.json();
        })
        .then(data => {
            console.log("Weather Data: ", data);

            alertError.textContent = ''; 

            latitude.textContent = `Latitude: ${data.coord.lat}`;
            longitude.textContent = `Longitude: ${data.coord.lon}`;
            const description = data.weather[0].description.toUpperCase().trim();
            weatherDescription.textContent = description;

            const weatherImages = {
                "MODERATE RAIN": "pexels-calvin-_cowakces-580917276-25440137.jpg",
                "LIGHT RAIN": "pexels-calvin-_cowakces-580917276-25440137.jpg",
                "OVERCAST CLOUDS": "pexels-fox-58267-750821.jpg",
                "THUNDERSTORM": "pexels-amolmande-2684011.jpg",
                "FEW CLOUDS": "pexels-brett-sayles-912364.jpg",
                "CLEAR SKY": "pexels-john-tekeridis-21837-754419.jpg",
                "SCATTERED CLOUDS": "pexels-asadphoto-1450341.jpg",
                "BROKEN CLOUDS": "pexels-bedirdalbay-27198160.jpg"
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
            date.textContent = `${currentDate.toLocaleDateString('en-GB')} ${currentDate.toLocaleTimeString()}`;

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
