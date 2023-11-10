import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet';
import './DataTrafico.css';

function DataTrafico() {
  const [agencia, setAgencia] = useState('');
  const [linea, setLinea] = useState('');
  const [transportData, setTransportData] = useState([]);
  const [centrado, setCentrado] = useState([-34.64359, -58.47478]);
  const [cargando, setCargando] = useState(false);
  const mapRef = useRef(null);

  const handleAgenciaChange = (event) => {
    const selectedAgencia = event.target.value;
    setAgencia(selectedAgencia);
    // Al seleccionar una nueva agencia, reseteamos la selección de la línea
    setLinea('');
  };

  const handleSelectChange = (event) => {
    const selectedLinea = event.target.value;
    setLinea(selectedLinea);
  };

  const calcularPromedioColectivos = (data) => {
    const colectivosSeleccionados = data
      .filter(item => item.route_id === linea && item.agency_name === agencia);

    if (colectivosSeleccionados.length > 0) {
      const latitudes = colectivosSeleccionados.map(item => item.latitude);
      const longitudes = colectivosSeleccionados.map(item => item.longitude);
      const centerLat = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
      const centerLng = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;
      return [centerLat, centerLng];
    } else {
      // Si no hay colectivos seleccionados, mantener el centro actual del mapa
      return centrado;
    }
  };

  const handleYendoClick = () => {
    if (transportData.length > 0 && mapRef.current) {
      const nuevoCentro = calcularPromedioColectivos(transportData);
      mapRef.current.flyTo(nuevoCentro, 13);
    }
  };

  useEffect(() => {
    fetchDataTrafico();
  }, []);

  const fetchDataTrafico = async () => {
    setCargando(true);

    try {
      const response = await fetch('https://datosabiertos-transporte-apis.buenosaires.gob.ar:443/colectivos/vehiclePositionsSimple?client_id=cb6b18c84b3b484d98018a791577af52&client_secret=3e3DB105Fbf642Bf88d5eeB8783EE1E6');
      if (!response.ok) {
        throw new Error(`Error de servidor: Código ${response.status}`);
      }
      const data = await response.json();
      setTransportData(data);
      setCargando(false);
    } catch (error) {
      console.error(error);
      setCargando(false);
    }
  };

  return (
    <div>
      <div className="barramapa" style={{ backgroundColor: '#bea0a0', border: '2px solid #551313' }}>
      <h3 className="titulo">BONDIS DE CABA</h3>

        <div>
          <label htmlFor="opcionesAgenciaDropdown">Selecciona una agencia: </label>
          <select id="opcionesAgenciaDropdown" value={agencia} onChange={handleAgenciaChange}>
            <option value="">Todas las agencias</option>
            {Array.from(new Set(transportData.map(item => item.agency_name))).map((agenciaNombre, index) => (
              <option key={index} value={agenciaNombre}>
                {agenciaNombre}
              </option>
            ))}
          </select>
          <label htmlFor="opcionesDropdown">Selecciona un colectivo: </label>
          <select id="opcionesDropdown" value={linea} onChange={handleSelectChange}>
            <option value=""> </option>
            {transportData
              .filter(item => item.agency_name === agencia)
              .map(item => item.route_id)
              .filter((value, index, self) => self.indexOf(value) === index)
              .map(routeId => (
                <option key={routeId} value={routeId}>
                  {routeId}
                </option>
              ))
            }
          </select>
          <button onClick={handleYendoClick}>Yendo</button>
        </div>
      </div>

      <MapContainer center={centrado} zoom={13} scrollWheelZoom={true} ref={mapRef}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cargando && <div className="cargando-mensaje">Aguarde un momento...</div>}
        {linea !== '' && !cargando && (
          transportData
            .filter(item => item.agency_name === agencia && item.route_id === linea)
            .map((item, index) => (
              <Marker key={item.id || index} position={[item.latitude, item.longitude]}>
                <Popup>
                  <>Ruta: {[item.route_id]}</>
                  <br></br>
                  <>{[item.trip_headsign]}</>
                  <br></br>
                  <>Línea: {[item.route_short_name]}</>
                  <br></br>
                  <>Agencia: {[item.agency_name]}</>
                </Popup>
              </Marker>
            ))
        )}
      </MapContainer>
    </div>
  );
}

export default DataTrafico;
