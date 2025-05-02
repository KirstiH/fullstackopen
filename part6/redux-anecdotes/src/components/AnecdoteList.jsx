import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

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
    const anecdotes = useSelector(state => state)

    return (
        <div>
          {anecdotes.map(anecdote =>
            <Anecdote
              key={anecdote.id}
              content={anecdote.content}
              votes={anecdote.votes}
              handleClick={() => dispatch(voteAnecdote(anecdote.id))}
            />
          )}
        </div>
    )
}

export default AnecdoteList