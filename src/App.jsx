import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("Bengaluru");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "7b1c05e930bcd6138b82e097a3405b8e"; // <-- Replace with your key

  const getWeather = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError("");
    } catch {
      setWeather(null);
      setError("City not found!");
    }
  };

  useEffect(() => {
    getWeather(city);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather(city);
  };

  const dailyForecast =
    weather &&
    weather.list.filter((item) => item.dt_txt.includes("12:00:00"));
  return (
  <div className="app">

    {/* HEADER */}
    <header className="header">
      <h1>Weather App 🌤️</h1>
    </header>

    {/* SEARCH */}
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button type="submit">Search</button>
    </form>

    {error && <p className="error">{error}</p>}

    {weather && (
      <>
        {/* CURRENT WEATHER CARD */}
        <section className="current-card">
          <h2>{weather.city.name}, {weather.city.country}</h2>
          <div className="temp">{weather.list[0].main.temp}°C</div>
          <p className="desc">{weather.list[0].weather[0].description}</p>

          <div className="extra">
            <div>Humidity: {weather.list[0].main.humidity}%</div>
            <div>Wind: {weather.list[0].wind.speed} km/h</div>
          </div>
        </section>

        {/* HOURLY FORECAST */}
        <section className="hourly-section">
          <h2>Hourly Forecast</h2>
          <div className="hourly-scroll">
            {weather.list.slice(0, 8).map((item, index) => (
              <div key={index} className="hour-card">
                <p>{new Date(item.dt * 1000).getHours()}:00</p>
                <p>{item.main.temp}°C</p>
                <p>{item.weather[0].main}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5 DAY FORECAST */}
        <section className="daily-section">
          <h2>5-Day Forecast</h2>
          <div className="daily-grid">
            {weather.list
              .filter((item) => item.dt_txt.includes("12:00:00"))
              .map((day, index) => (
                <div key={index} className="day-card">
                  <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
                  <p>{day.main.temp_max}° / {day.main.temp_min}°</p>
                  <p>{day.weather[0].main}</p>
                </div>
              ))}
          </div>
        </section>
      </>
    )}
      <footer className="footer">
  Built with ❤️ by <strong>Balaji Akula</strong>
</footer>
  </div>
  
);
}

export default App;
