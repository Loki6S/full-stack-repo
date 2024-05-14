import { useState, useEffect } from 'react';
import weatherService from '../services/weather';

const useWeather = (lat, long) => {
    const [weather, setWeather] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(lat,long);
        weatherService.getWeather(lat, long)
            .then(response => {
                console.log("temperature 2m =>",response.data.hourly.temperature_2m)
                setWeather(response.data.hourly.temperature_2m[0]);
            })
            .catch(err => {
                console.log(err);
                setError(err);
            });
    }, [lat, long]); // Dependencies to only re-run the effect if lat or long changes

    return { weather, error };
}

export default useWeather;
