import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/"

const getCountries = () =>{
    return axios.get(`${baseUrl}api/all`)
}

const getByName = (name) =>{
    return axios.get(`${baseUrl}name/${name}`)
}

export default {getCountries,getByName}