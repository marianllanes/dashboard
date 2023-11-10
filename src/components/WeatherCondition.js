import React from 'react';

const WeatherCondition = ({ weatherCode }) => {
    console.log('weatherCode:', weatherCode);
    const weatherCodeInfo = {
        0: "Despejado",
        1: "Mayormente despejado",
        2: "Parcialmente Nublado",
        3: "Nublado / Cubierto",
        45: "Niebla",
        46: "Niebla con escarcha",
        51: "Llovizna Ligera",
        53: "Llovizna Moderada",
        55: "Llovizna Intensa",
        56: "Escarcha Ligera",
        57: "Escarcha Densa",
        61: "Lluvia Ligera",
        63: "Lluvia Moderada",
        65: "Lluvia Intensa",
        66: "Lluvia Fría, Ligera",
        67: "Lluvia Fría, Intensa",
        71: "Nevada Ligera",
        73: "Nevada Moderada",
        75: "Nevada Intensa",
        77: "Aguanieve",
        80: "Tormenta Ligera",
        81: "Tormenta Moderada",
        82: "Tormenta Fuerte",
        85: "Tormenta de Nieve Moderada",
        86: "Tormenta de Nieve Fuerte",
        95: "Tormenta Eléctrica",
        96: "Tormenta Eléctrica con Granizo Ligero",
        99: "Tormenta Eléctrica con Granizo Pesado",
    };

    const conditionName = weatherCodeInfo[weatherCode] || "Desconocido";

    return (
        <span>{conditionName}</span>
    );
};

export default WeatherCondition;
