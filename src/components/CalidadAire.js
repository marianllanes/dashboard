import React from 'react';

function CalidadAire(props) {
    const { airQualityData } = props;

    const airQualityArray = airQualityData.hourly?.european_aqi || [];

    // Asegurarse de que airQualityArray esté definido y tenga datos
    if (!airQualityArray.length) {
        return (
            <div className="weather-card-section">
                <h3>Calidad del Aire</h3>
                <p>Datos no disponibles</p>
            </div>
        );
    }

    // Calcular el promedio de la calidad del aire
    const averageAirQuality = airQualityArray.reduce((acc, value) => acc + value, 0) / airQualityArray.length;

    return (
        <div className="weather-card-section">
            <h3>Calidad del Aire</h3>
            <p>Índice de Calidad del Aire: {averageAirQuality.toFixed(2)}</p>
        </div>
    );
}

export default CalidadAire;

