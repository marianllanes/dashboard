import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import TemperatureChart from './TemperatureChart';
import PieChartWithNeedle from './PieChartWithNeedle';
import AtardecerAmanecer from './AtardecerAmanecer.js';
import Humedad from './Humedad';
import Visibilidad from './Visibilidad';
import Viento from './Viento';
import IndiceUV from './IndiceUV';
import TemperaturaMaxMin from './TempMaxMin';
import Lluvia from './Lluvia';
import WeatherCondition from './WeatherCondition';
import './DataClima.css'
import CalidadAire from './CalidadAire.js';
import DiaONoche from './DiaONoche';

// Importa las imágenes desde la carpeta "src/Weather-icons"
import escarcha from '../Weather-icons/escarcha.png';
import lluvia from '../Weather-icons/lluvia.png';
import menosNublado from '../Weather-icons/menos-nublado.png';
import niebla from '../Weather-icons/niebla.png';
import nieve from '../Weather-icons/nieve.png';
import nublado from '../Weather-icons/nublado.png';
import rayo from '../Weather-icons/rayo.png';
import soleado from '../Weather-icons/soleado.png';
import temporal from '../Weather-icons/temporal.png';


function DataClima() {
    const [weatherData, setWeatherData] = useState({});

    useEffect(() => {
        const UserData = async () => {
            try {
                const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-31.4135&longitude=-64.181&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode,visibility,uv_index,is_day&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&current_weather=true&timezone=America%2FSao_Paulo&forecast_days=1');
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                console.error('Error al obtener los datos de la API:', error);
            }
        };
        UserData(); // Llama a la función para cargar los datos cuando el componente se monte.

    }, []); // El segundo argumento [] asegura que se ejecute solo una vez, cuando el componente se monte.


    const [airQualityData, setAirQualityData] = useState({})

    useEffect(() => {
        const fetchAirQualityData = async () => {
            try {
                const response = await fetch('https://air-quality-api.open-meteo.com/v1/air-quality?latitude=-31.4135&longitude=-64.181&hourly=european_aqi&timezone=America%2FSao_Paulo');
                const data = await response.json();
                setAirQualityData(data);
            } catch (error) {
                console.error('Error al obtener los datos de calidad del aire:', error);
            }
        };

        fetchAirQualityData(); // Llama a la función para cargar los datos cuando el componente se monte.

    }, []); // El segundo argumento [] asegura que se ejecute solo una vez, cuando el componente se monte.

    console.log('weatherData:', weatherData);

    // dia o noche?
    const isDay = weatherData.current_weather?.is_day === 1;
    
    const userData = weatherData || {}; // Si weatherData es null, userData será un objeto vacío.

    //condicion del tiempo
    const weathercode = weatherData.current_weather?.weathercode || '';
    console.log('weathercode:', weathercode);

    //Humedad
    const humidityData = weatherData.hourly?.relativehumidity_2m || null;

    //Viento
    const windData = userData?.current_weather?.windspeed || '';

    //Lluvia
    const precipitationData = userData.hourly?.precipitation_probability || null;

    //visibilidad
    const visibilityData = weatherData.hourly?.visibility || null;

    // fecha y  hora del objeto current_weather
    const currentDate = weatherData?.current_weather?.time?.split('T')[0] || '';
    const currentTime = weatherData?.current_weather?.time?.split('T')[1] || '';

    //Datos para AmanecerAtardecer
    const sunriseData = userData?.daily?.sunrise || '';
    const sunsetData = userData?.daily?.sunset || '';
    //convierte las cadenas de amanecer y atardecer en objetos de fecha y 
    //luego usa toLocaleTimeString para obtener la hora en el formato deseado.
    const sunrise = sunriseData ? (new Date(sunriseData)).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '';
    const sunset = sunsetData ? (new Date(sunsetData)).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '';

    //  valor de uv_index_max 
    const uvIndexMax = userData.daily?.uv_index_max || null;

    // Acceder a otras propiedades si es necesario
    const temperature = weatherData.current_weather?.temperature || '';

    // Nuevas constantes para temperatura máxima y mínima
    const temperaturaMaxima = userData.daily?.temperature_2m_max || '';
    const temperaturaMinima = userData.daily?.temperature_2m_min || '';

    //Temperatura durante el dia
    const hourlyTimes = weatherData?.hourly;
    const temperatures = hourlyTimes?.temperature_2m || [];

    // Utiliza estas importaciones en tu objeto weatherIcons
    const weatherIcons = {
        0: soleado,
        1: menosNublado,
        2: menosNublado,
        3: nublado,
        45: niebla,
        46: niebla,
        51: lluvia,
        53: lluvia,
        55: lluvia,
        56: escarcha,
        57: escarcha,
        61: lluvia,
        63: lluvia,
        65: lluvia,
        66: lluvia,
        67: lluvia,
        71: nieve,
        73: nieve,
        75: nieve,
        77: nieve,
        80: temporal,
        81: temporal,
        82: temporal,
        85: nieve,
        86: nieve,
        95: rayo,
        96: rayo,
        99: rayo,
    };

    return (
        <div className="App">
            <div className="date-time-container">
                <div>
                    <h1> {currentDate} </h1>
                    <h1> {currentTime} </h1>
                </div>
                <DiaONoche isDay={isDay}/>
            </div>
            <div className="chart-container">
                <PieChartWithNeedle temperature={temperature} />
            </div>

            <div className="weather-cards">
                <WeatherCard
                    location="Cordoba"
                    temperature={temperature}
                    condition={<WeatherCondition weatherCode={weathercode} />}
                    icon={weatherIcons[weathercode] || "desconocido.png"}
                />

                <TemperatureChart temperatures={temperatures} />

                <div className="weather-card">
                    <Viento windData={windData} />
                    <AtardecerAmanecer sunrise={sunrise} sunset={sunset} />
                </div>
                <div className="weather-card">
                    <Humedad humidityData={humidityData} />
                    <CalidadAire airQualityData={airQualityData} lo />
                </div>
                <div className="weather-card">
                    <Visibilidad visibilityData={visibilityData} />
                    <IndiceUV uvIndexMax={uvIndexMax} />
                </div>
                <div className="weather-card">
                    <TemperaturaMaxMin temperaturaMaxima={temperaturaMaxima} temperaturaMinima={temperaturaMinima} />
                </div>
                <div className="weather-card">
                    <Lluvia precipitationData={precipitationData} currentTime={weatherData?.current_weather?.time.split('T')[1]} />
                </div>

            </div>
        </div>
    );
}

export default DataClima;