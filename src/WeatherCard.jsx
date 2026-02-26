import React from "react";

function WeatherCard({ weather }) {
  const { name, main, weather: weatherDetails } = weather;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherDetails[0].icon}@4x.png`;

  return (
    <div
      className="weather-card"
      style={{
        maxWidth: "320px",
        margin: "20px auto",
        padding: "20px",
        borderRadius: "20px",
        background: "linear-gradient(135deg, #6dd5fa, #2980b9)",
        color: "#fff",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        textAlign: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        transition: "transform 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
      }}
    >
      <h2 style={{ fontWeight: "700", fontSize: "1.8rem", marginBottom: "10px" }}>
        {name}
      </h2>
      <img
        src={iconUrl}
        alt={weatherDetails[0].description}
        style={{ width: "120px", height: "120px" }}
      />
      <h3 style={{ fontSize: "2.2rem", margin: "10px 0" }}>
        {Math.round(main.temp)}°C
      </h3>
      <p
        style={{
          textTransform: "capitalize",
          fontSize: "1.1rem",
          marginBottom: "8px",
          letterSpacing: "0.5px",
        }}
      >
        {weatherDetails[0].description}
      </p>
      <p style={{ fontSize: "1rem", opacity: 0.9 }}>Humidity: {main.humidity}%</p>
    </div>
  );
}

export default WeatherCard;
