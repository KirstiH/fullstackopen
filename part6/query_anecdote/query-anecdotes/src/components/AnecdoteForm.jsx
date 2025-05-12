import { getAnecdotes, createAnecdote } from '../requests'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../notificationContext'

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notificationDispatch({ type: 'SET', payload: `you created anecdote '${newAnecdoteMutation.variables.content}'` })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notificationDispatch({ type: 'SET', payload: `anecdote must be at least 5 characters long` })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
