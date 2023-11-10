import React from 'react';

function AtardecerAmanecer(props) {
  const { sunrise, sunset } = props; // Recibe las props sunrise y sunset

  console.log('datos AtardecerAmanecer :', sunrise, sunset );
  return (

    <div className="weather-card-section">
      <h3> Amanecer y Atardecer</h3>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <p>Salida: {sunrise}</p>
        <p style={{ marginLeft: '10px' }}>Puesta: {sunset}</p>
      </div>
    </div>

  );
}

export default AtardecerAmanecer;

