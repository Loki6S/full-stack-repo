import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getPersons = () =>{
    return axios.get(baseUrl)
}

const addPerson = (personObject) =>{
    return axios.post(baseUrl,personObject)
}

const removePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updatePersonsNumber = (info,id) => {
    return axios.put(`${baseUrl}/${id}`,info)
}

export default {getPersons,addPerson,removePerson,updatePersonsNumber}