import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAnecdote => {
  if (newAnecdote.content.length < 5) {
    throw new Error('anecdote must be at least 5 characters long')
  }
  axios.post(baseUrl, newAnecdote).then(res => res.data)
}
    

export const updateAnecdote = anecdote => 
    axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then(res => res.data)