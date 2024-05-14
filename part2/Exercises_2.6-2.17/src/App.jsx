import Persons from './components/Persons';
import Filter from './components/Filter';  
import PersonForm from './components/PersonForm';
import { useState,useEffect } from 'react';
import personService from './services/persons'
import './index.css'
import { Notification } from './components/Notification';



const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message,setMessage] = useState('some message...')
  const [notifType,setNotifType] = useState('success')
  useEffect(()=>{
    console.log("Effect")
    personService
    .getPersons()
    .then(response =>{
      console.log("promise resolved")
      setPersons(response.data)
    })
  },[])

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name === newName && person.number === newNumber)) {
      alert(`${newName} is already added to phonebook`);
      return;
    } else if (persons.some(person => person.name === newName && person.number !== newNumber)){
      const existingPerson = persons.find(person => person.name === newName);
      updatePhoneNumber(existingPerson.id, newNumber)
      return;
    }
    const personObject = { name: newName, number: newNumber, id: String(persons.length + 1) };
    personService
      .addPerson(personObject)
      .then(response =>{
        setPersons(persons.concat(response.data))
        setMessage(`Added ${newName}`)
        setTimeout(()=>{
          setMessage('Default Message')
        },3000)
        setNewName('');
        setNewNumber('');
      })    
  };

  const deleteperson = (id) =>{
    const filteredPerson = persons.filter(person => person.id === id)
    const personName = filteredPerson[0].name
    const personId = filteredPerson[0].id
    if (window.confirm(`Delete ${personName} ?`)){
      personService
        .removePerson(personId)
        .then (()=> {
      console.log(`${personName} successfully deleted`) 
      setPersons(persons.filter(person => person.id !==personId))
      })
      .catch(error => {
        console.log('Error deleting the person:',error)
        setNotifType('error')
        setMessage(`Information of ${personName} has already been removed from server`)
        setTimeout(()=>{
          setNotifType('success')
          setMessage('Default Message')
        },3000)
      })
      
    }
  }

  const updatePhoneNumber = (id,number) =>{
    const person = persons.find(person => person.id === id)
    const changedNumber = {...person, number:number}
    personService
      .updatePersonsNumber(changedNumber,id)
      .then(response =>{
        setPersons(persons.map(p => p.id === id? {...p, number:number} : p));
        setMessage('Number updated.')
        setTimeout(()=>{
          setMessage('Default Message')
        },3000)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={notifType}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deleteElement={deleteperson}/>
    </div>
  );
};

export default App;
