import React from 'react';

function getMensaje(probabilidadLluvia) {
  if (probabilidadLluvia >= 0 && probabilidadLluvia <= 25) {
    return "Puedes lavar ropa.";
  } else if (probabilidadLluvia <= 50) {
    return "Lava el auto, no creo que llueva.";
  } else if (probabilidadLluvia <= 75) {
    return "Yo que vos llevo un piloto";
  } else if (probabilidadLluvia <= 100) {
    return "Lleva un paraguas contigo.";
  }
  return "";
}

function Lluvia(props) {
  const { precipitationData, currentTime } = props;

  // Asegurarse de que precipitationData esté definido
  if (!precipitationData || precipitationData.length === 0) {
    return (
      <div className="weather-card-section">
        <h3>Probabilidad de lluvia</h3>
        <p>Datos no disponibles</p>
      </div>
    );
  }

  // Extraer la hora actual en formato "HH:mm"
  const currentHour = currentTime.split(':')[0];

  // Encontrar el índice correspondiente en el array de probabilidades de lluvia
  const index = parseInt(currentHour, 10);

  // Verificar si el índice es válido
  if (!isNaN(index) && index >= 0 && index < precipitationData.length) {
    const probabilidadLluvia = precipitationData[index];
    const mensaje = getMensaje(probabilidadLluvia);

    return (
      <div className="weather-card-section">
        <h3>Probabilidad de lluvia</h3>
        <p>{probabilidadLluvia}%</p>
        <p>{mensaje}</p>
      </div>
    );
  } else {
    return (
      <div className="weather-card-section">
        <h3>Probabilidad de lluvia</h3>
        <p>Datos no disponibles</p>
      </div>
    );
  }
}

export default Lluvia;
