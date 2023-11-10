import React from 'react';

function TemperaturaMaxMin(props) {
  const { temperaturaMaxima, temperaturaMinima } = props; // Recibe las temperaturas máximas y mínimas desde las props

  return (
    <div className="weather-card-section">
      <h3>Temperatura</h3>
      <p>Maxima: {temperaturaMaxima}°C</p>
      <p>Minima: {temperaturaMinima}°C</p>
    </div>
  );
}

export default TemperaturaMaxMin;
