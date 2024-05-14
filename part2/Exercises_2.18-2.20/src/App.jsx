import { useEffect, useState } from 'react'
import CountryForm from './components/CountryForm';
import countryService from './services/countries';
import Countries from './components/Countries';

const App=()=> {
  const x = [1,2,3,4,5]
  const [countries,setCountries] = useState([]);
  const [filter, setFilter] =useState('')
  const [newName,setNewName] = useState("some name")

  useEffect(()=>{
    console.log("Effect");
    countryService
    .getCountries()
    .then(response =>{
      setCountries(response.data)
    console.log(countries[0]);
    }).catch(error =>{
      console.log(error);
    })
  },[])

  const handleFilterChange = (event) =>{
    console.log(event.target.value)
    setFilter(event.target.value);
  }
  const handleNameChange = (event) =>{
    setNewName(event.target.value); 
  }
  

  const countriesToShow = filter
    ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    : countries

  return (
    
    <div>
      
      <CountryForm filter={filter} handleFilterChange={handleFilterChange}/>
      <Countries countriesToShow={countriesToShow}/>
    </div>
   
  )
}

export default App;
