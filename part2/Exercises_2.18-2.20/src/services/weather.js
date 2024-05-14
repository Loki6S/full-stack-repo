import axios from 'axios';

const getWeather = (lat,long) =>{
    console.log("inside getWeather");
    const resp= axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`)
    console.log("resp =>", resp);
    return resp;
}   

export default {getWeather}