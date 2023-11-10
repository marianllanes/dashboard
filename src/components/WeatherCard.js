import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ location, temperature, condition, icon }) => {
  console.log('Condition:', condition); 

  return (
    <div className="weather-card">
      <div className="weather-card-header">
        <img src={icon} alt="Weather Icon" />
        <h2>{location}</h2>
      </div>
      <div className="weather-card-body">
        <p>Temperatura: {temperature}°C</p>
        <p>Condición: {condition}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
