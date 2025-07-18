import { useState } from 'react'
import {
  Routes, Route, Link, useMatch, useNavigate
} from 'react-router-dom'
import PropTypes from 'prop-types'
import  { useField } from './hooks'


const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id}>
           <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>)}
    </ul>
  </div>
)



const Anecdote = ({ anecdote }) => {

  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <h4>has {anecdote.votes} votes</h4>
      <h4>for more info see <a href = {anecdote.info}>{anecdote.info}</a></h4>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is &quot;a story with a point.&quot;</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')


  const handleSubmit = (e) => {
    e.preventDefault()
    // eslint-disable-next-line react/prop-types
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const handleReset = () => {
    content.reset()
    author.reset()  
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form >
        <div>
          content:
          <input {...content} /> 
        </div>
        <div>
          author:
          <input {...author}/>
        </div>
        <div>
          info:
          <input {...info}/>
        </div>
        <button onClick={handleSubmit}>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const navigate = useNavigate()
  

  const padding = {
    paddingRight: 5
  }

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    
    setNotificationWithTimeout(`a new anecdote ${anecdote.content} created!`)
    navigate('/')
  }

  const setNotificationWithTimeout = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const Notification = ({ notification }) => {
    if (notification === '') {
      return null
    }
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div style={style}>
        { notification }
      </div>
    )
  }

  AnecdoteList.propTypes = {
    anecdotes: PropTypes.arrayOf(PropTypes.object).isRequired
  }
  Anecdote.propTypes = {
    anecdote: PropTypes.object.isRequired
  }
  Notification.propTypes = {
    notification: PropTypes.string.isRequired
  }
  

  const match = useMatch('/anecdotes/:id')

  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1
  //   }

  //   setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  // }

  return (
    <div>
      
      <h1>Software anecdotes</h1>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>

        <Notification notification={notification} />

      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default App
