import React from 'react';

function IndiceUV(props) {
  // Extrae el valor de uv_index_max de las props
  const uvIndexMax = props.uvIndexMax;

  return (
    <div className="weather-card-section">
      <h3>Índice UV</h3>
      <p>{uvIndexMax}: usa siempre filtro solar</p>
    </div>
  );
}

export default IndiceUV;
