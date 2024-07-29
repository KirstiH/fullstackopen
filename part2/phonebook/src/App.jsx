import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredSearch, setFiltered] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    } else {
      const noteObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      setPersons(persons.concat(noteObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleAddName = (event) => {
    setNewName(event.target.value)
  }

  const handleAddNumber = (event) => {
    setNewNumber(event.target.value)
    console.log(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log('Searching for:', event.target.value)
    setFiltered(event.target.value)
  }


  const personsToShow = filteredSearch === ""
    ? persons
    : persons.filter(person => 
      person.name.toLowerCase().includes(filteredSearch.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearchChange={handleSearchChange} filteredSearch={filteredSearch} />
      <h3>Add a new</h3>
      <div>
        <PersonForm 
        newName={newName} 
        newNumber={newNumber}
        handleAddName={handleAddName} 
        handleAddNumber={handleAddNumber}
        addName={addName}/>  
      </div> 
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App