import { useState, useEffect } from 'react'
import axios from 'axios'
import phoneService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Notification from './components/Notification'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredSearch, setFiltered] = useState('');
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null);



  useEffect(() => {
    phoneService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault();
    const noteObject = {
      name: newName,
      number: newNumber,
    }
    if (persons.find(person => person.name === newName)){
      const person = persons.find(person => person.name === newName)
      const changedPerson = { ...person, number: newNumber}
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one`)){

      phoneService
      .update(person.id, changedPerson).then(returnedPerson => {
        setPersons(persons.filter(person => person.name !== newName ? person : returnedPerson))
      })
      .catch(error => {
        setMessage(
          `Information of ${newName} has already been removed`
        )
        setMessageType('error')
      })
      setTimeout(() => {
        setMessage(null)
      }, 3000)
      setPersons(persons.filter(person => person.id !== noteObject.id))
      setNewName('')
      setNewNumber('')
      setMessage(
        `Information of ${newName} has been updated`
      )
      setMessageType('success')
    }

    } else {
      phoneService
      .create(noteObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setMessage(
          `Added ${newName}`
        )
        setMessageType('success')
        setTimeout(() => {
          setMessage(null)
        }, 3000)
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
          phoneService
            .deletion(person.id)
              .then( response=>{
              setPersons(persons.filter(person => person.id !== id))
            })
        } else {
          console.log("you canceled the deletion")
        }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageType={messageType} />
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