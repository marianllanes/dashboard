import React from 'react';
import dia from '../Weather-icons/dia.gif';
import noche from '../Weather-icons/noche.gif';

const DiaONoche = ({ isDay }) => {
  return (
    <div>
      {isDay ? (
        // Si es de día, muestra el GIF de día
        <img src={dia} alt="Día" style={{ width: '50%', height: '50%' }} />
      ) : (
        // Si es de noche, muestra el GIF de noche
        <img src={noche} alt="Noche" style={{ width: '50%', height: '50%' }} />
      )}
    </div>
  );
};

export default DiaONoche;
