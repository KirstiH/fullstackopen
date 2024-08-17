import { useState, useEffect } from 'react'
import axios from 'axios'
import phoneService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredSearch, setFiltered] = useState('');


  useEffect(() => {
    phoneService
      .getAll()
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
      }

      phoneService
      .create(noteObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
    }
  }


  const handleAddName = (event) => {
    setNewName(event.target.value)
  }

  const handleAddNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setFiltered(event.target.value)
  }


  const personsToShow = filteredSearch
    ? persons.filter(person => person.name.toLowerCase().includes(filteredSearch.toLowerCase()))
    : persons

  const handleDeletePerson = id => {
        const person = persons.find(person => person.id === id)
        if (confirm(`Delete ${person.name}`)){
          phoneService.deletion(person.id).then( response=>{
            setPersons(persons.filter(person => person.id !== id))
            console.log(persons)
          })
        } else {
          console.log("you canceled the deletion")
        }
  }


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
      <div>
      {personsToShow.map(person => 
        <Person 
          key={person.id} 
          person={person} 
          handleDeletePerson={() => handleDeletePerson(person.id)} 
        />
      )}
      </div>
    </div>
  )
}

export default App