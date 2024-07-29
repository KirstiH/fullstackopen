import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredSearch, setFiltered] = useState('');

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