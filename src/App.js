import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [citiesWeather, setCitiesWeather] = useState([]);
  const handleChange = (e) => {
    setCity(e.target.value);
  };
  const handleSearch = async () => {
    if (city.trim() === '')return;
    const apiKey ='ea171853460e408d97423037253004';
    const url = ` http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=es`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();

      const alreadyExist = citiesWeather.some(
        (item) => item.location.name === data.location.name
      );
      if (!alreadyExist) {
        setCitiesWeather([...citiesWeather, data]);
      }

      setCity('');

    }catch (error) {
      console.error('Error al buscar el clima', error);
    }

  };

  const handleDeleteOne = (index) =>  {
    const newList = citiesWeather.filter((_,i) => i !== index);
  };

  const handleClearAll = () => {
    setCitiesWeather([]);
  };

  
  return (
    <div className="main-container">
      <h1>Weather<b>Channel17</b></h1>
      <p>Interesado en el clima? 
        <i><b> Busca aquí el clima de tu ciudad </b></i>
      </p>
      {/*Sección de busqueda*/ }
      <div className= "search-section">
        <input 
        type="text" 
        placeholder=" Ej: RD, NY, MA, PR, ETC..."
        value={city}
        onChange={handleChange}>
        </input>
        <button onClick={handleSearch}>Buscar</button>
        
        {citiesWeather.length > 0 && (
          <button onClick={handleClearAll}>Limpiar Todo</button>
        )}
      </div>
      {/*Tarjetas del clima*/}
      <div className="card-container">
        {citiesWeather.map((weather, index) => (
          <div key={index} className="weather-card">
            <img 
            src={`https://source.unsplash.com/featured/?${weather.location.name}`} 
            alt={`Imagen de ${weather.location.name}`}
            style={{ width: '100%', height: '150px', objecFit: 'cover', borderRadius: '12px' }}/>

            <h2>{weather.location.name},{weather.location.country}</h2>
            <p>Temperatura: {weather.current.temp_c}°C</p>
            <p>Condición: {weather.current.condition.text}</p>
            <img src={weather.current.condition.icon}  alt="icono clima"></img>
            <button onClick={()  =>  handleDeleteOne(index)}>Eliminar</button>
            </div>

        ))}
      </div>
    </div>
  );
}

export default App;
