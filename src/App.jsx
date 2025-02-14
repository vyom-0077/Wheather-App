import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [background, setBackground] = useState(
    "linear-gradient(135deg, #6dd5ed, #2193b0)"
  ); // Default background

  const API_KEY = "697dcbb60a035f4f1c418ed6d2043b9a"; // Replace with your OpenWeatherMap API key
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  // Function to set background based on weather condition
  const setWeatherBackground = (weatherCondition) => {
    switch (weatherCondition) {
      case "Clear":
        setBackground("linear-gradient(135deg, #ff9a9e, #fad0c4)");
        break;
      case "Clouds":
        setBackground("linear-gradient(135deg, #a1c4fd, #c2e9fb)");
        break;
      case "Rain":
        setBackground("linear-gradient(135deg, #4facfe, #00f2fe)");
        break;
      case "Snow":
        setBackground("linear-gradient(135deg, #e6e9f0, #eef1f5)");
        break;
      default:
        setBackground("linear-gradient(135deg, #6dd5ed, #2193b0)");
    }
  };

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    try {
      const response = await axios.get(API_URL);
      setWeather(response.data);
      setError("");
      setWeatherBackground(response.data.weather[0].main); // Set background based on weather
    } catch (err) {
      setError("City not found. Please try again.");
      setWeather(null);
    }
  };

  return (
    <div className="App" style={{ background }}>
      <div className="container">
        <h1>Weather App</h1>
        <form onSubmit={fetchWeather}>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Get Weather</button>
        </form>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-result fade-in">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
