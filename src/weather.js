import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './weather.css'; // Assuming you have the Weather.css file for styling


const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = '1d521fe5b4c764321c1ee76ebee91066'; // Replace with your actual API key

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherData();
  }, [city, apiKey]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCity(e.target.elements.city.value);
  };

  const getBackgroundImage = () => {
    if (!weatherData) return '';

    const weather = weatherData.weather[0].main.toLowerCase();
    if (weather == "haze") {
      return 'sky.jpg'; // Replace with your clear weather image file name
    } else if (weather.includes('clouds')) {
      return 'clouds.jpg'; // Replace with your cloudy weather image file name
    } else if (weather.includes('rain')) {
      return 'thuder.jpg'; // Replace with your rainy weather image file name
    } else if (weather.includes('snow')) {
      return 'snowy.jpg'; // Replace with your snowy weather image file name
    } else {
      return 'default.jpg'; // Replace with your default weather image file name
    }
  };

  if (!weatherData) {
    return (
      <div className="weather-app">
        <h2>Weather App</h2>
        <form onSubmit={handleSearch}>
          <input type="text" name="city" placeholder="Enter a city" />
          <button type="submit">Search</button>
        </form>
        <div>Loading...</div>
      </div>
    );
  }

  const backgroundImage = getBackgroundImage();

  return (
    <div className="weather-app" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h2>Weather App</h2>
      <form onSubmit={handleSearch}>
        <input type="text" name="city" placeholder="Enter a city" />
        <button type="submit">Search</button>
      </form>
      <p>City: {weatherData.name}</p>
      <p>Temperature: {weatherData.main.temp}°C</p>
      <p>Weather: {weatherData.weather[0].description}</p>
    </div>
  );
};

export default Weather;
