import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './TemperatureChart.css';

function TemperatureChart({ temperatures }) {
  // Comprueba si temperatures es una matriz antes de usar map
  if (!Array.isArray(temperatures)) {
    return null; // O cualquier otro comportamiento deseado
  }

  // Mapea las temperaturas y horas
  const data = temperatures.map((temperature, index) => ({
    hour: index, // Puedes usar el índice como hora si no tienes datos de hora en tu arreglo
    temperature: temperature,
  }));
  return (
    <div className="temperature-chart">
      <h3>El Clima para Hoy</h3>
      <div className="chart-container">
        <BarChart width={300} height={150} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="temperature" fill={"#551313"} />
        </BarChart>
      </div>
    </div>
  );
}

export default TemperatureChart;
