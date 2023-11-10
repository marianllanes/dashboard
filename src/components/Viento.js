import React from 'react';

function Viento(props) {
    // Extrae windData desde props
    const windData = props.windData;

    // Verifica si windData está definido y no es nulo
    if (windData !== null && windData !== undefined) {
        return (
            <div className="weather-card-section">
                <h3>Viento</h3>
                <p>{windData} km/h</p>
            </div>
        );
    } else {
        // Manejo de la situación en la que los datos no están disponibles
        return (
            <div className="weather-card-section">
                <h3>Viento</h3>
                <p>Información no disponible</p>
            </div>
        );
    }
}

export default Viento;

