import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'

// eslint-disable-next-line react/prop-types
const Anecdote = ({content, votes, handleClick}) => {
    return (
        <><div>
            {content}
        </div><div>
            has {votes}
            <button onClick={handleClick}>vote</button>
        </div></>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    //const anecdotes = useSelector(state => state.anecdotes)

    const anecdotes = useSelector(state => {
        if ( state.filter === '' ) {
          return state.anecdotes
        }
        return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().indexOf(state.filter) > -1)  
      })

    return (
        <div>
          {anecdotes.map(anecdote =>
            <Anecdote
              key={anecdote.id}
              content={anecdote.content}
              votes={anecdote.votes}
              handleClick={() => {
                dispatch(voteAnecdote(anecdote.id))
                dispatch(setNotification(`you voted '${anecdote.content}'`))
                setTimeout(() => {
                  dispatch(removeNotification())
                }, 5000)
              }}
            />
          )}
        </div>
    )
}

export default AnecdoteList