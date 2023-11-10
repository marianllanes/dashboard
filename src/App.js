import React from 'react';
import DataClima from './components/Dataclima';
import DataTrafico from './components/DataTrafico';
import './App.css';

function App() {
  return (
    <div className="AppContainer">
      <div className="left-container">
        <DataClima />
      </div>
      <div className="right-container">
        <DataTrafico />
      </div>
    </div>
  );
}

export default App;
