

import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const fetchedWeather = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m');
      console.log(fetchedWeather.data);
      setWeather(fetchedWeather.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      {weather && (
        <div>
          <h2>City: Berlin</h2>
          {weather.hourly.time.map((time, index) => (
            <div style={{ width: '100%', height: '250px', border: '2px solid green' }} key={index}>
              <p>Time: {time}</p>

              <p>Temperature: {weather.hourly.temperature_2m[index]}°C</p>
              <p>Wind Speed: {weather.hourly.wind_speed_10m[index]} km/h</p>
              <p>Humidity: {weather.hourly.relative_humidity_2m[index]}%</p>


            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;