# How's The Weather - A Simple Weather App

## Overview
**How's The Weather** is a simple weather web application built using **HTML, CSS, and JavaScript**, leveraging the **OpenWeather API** to fetch real-time weather data. The app dynamically updates the background image based on the weather description by selecting an image from a predefined array in `script.js`.

The API key is securely handled using **Netlify Functions**, ensuring safe access without exposing it to the frontend. The project is deployed using **Netlify**.

## Features
- Fetches real-time weather data using OpenWeather API
- Displays temperature, weather conditions, and location
- Dynamically changes the background image based on weather description
- API key security via Netlify Functions
- Responsive design for different screen sizes

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **API:** OpenWeather API
- **Hosting & Serverless Functions:** Netlify

## Project Structure
```
How's-The-Weather/
│── assets/               # Contains images and other assets
│── netlify/
│   ├── functions/
│   │   ├── getWeather.js # Netlify function to securely fetch weather data
│── node_modules/         # Installed dependencies
│── .env                 # Environment variables (not included in repo)
│── .gitignore           # Ignore node_modules and sensitive files
│── index.html           # Main HTML file
│── style.css            # CSS styling
│── script.js            # JavaScript logic for fetching and displaying weather data
│── netlify.toml         # Netlify configuration file
│── package.json         # Project dependencies and scripts
│── package-lock.json    # Dependency lock file
```

## Setup & Installation
### Prerequisites
- Node.js installed
- A Netlify account

### Steps
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/hows-the-weather.git
   cd hows-the-weather
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the root directory
   - Add your OpenWeather API key:
     ```sh
     OPENWEATHER_API_KEY=your_api_key_here
     ```
4. **Deploy to Netlify:**
   - Link your project to Netlify
   - Deploy with Netlify functions enabled

## Usage
- Open the deployed Netlify URL.
- Enter a city name to fetch and display weather data.
- The background image updates dynamically based on the weather conditions.

## License
This project is licensed under the MIT License.



