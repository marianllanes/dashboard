import React from 'react';

function Visibilidad(props) {
  const { visibilityData } = props;

  // Función para calcular el promedio de los datos de visibilidad
  const calcularPromedioVisibilidad = (visibilityData) => {
    if (!visibilityData || visibilityData.length === 0) return null;

    const sumatoria = visibilityData.reduce((total, valor) => total + valor, 0);
    const promedio = sumatoria / visibilityData.length;
    return promedio;
  };

  const promedioVisibilidad = calcularPromedioVisibilidad(visibilityData);

  console.log('visibilityData:', visibilityData);
  console.log('promedioVisibilidad:', promedioVisibilidad);

  return (
    <div className="weather-card-section">
      <h3>Visibilidad</h3>
      {promedioVisibilidad !== null ? (
        <p>{promedioVisibilidad} m</p>
      ) : (
        <p>Datos no disponibles</p>
      )}
    </div>
  );
}

export default Visibilidad;
