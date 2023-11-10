import React from 'react';

function Humedad(props) {
    // Verifica si props.humidityData está definido
    const humidityData = props.humidityData;

    if (humidityData) {
        // Extrae el valor de humedad de los datos
        const humedad = humidityData[0];

        return (
            <div className="weather-card-section">
                <h3>Humedad</h3>
                <p>{humedad}%</p>
            </div>
        );
    } else {
        // Manejo de la situación en la que los datos no están disponibles
        return (
            <div className="weather-card-section">
                <h3>Humedad</h3>
                <p>Información no disponible</p>
            </div>
        );
    }
}

export default Humedad;
