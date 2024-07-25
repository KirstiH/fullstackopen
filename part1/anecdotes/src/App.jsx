import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Display = ({ header, selectedAnecdote, pointsSelected }) => {
  return (
    <div>
      <h1>{header}</h1>
      {selectedAnecdote}
      <div>has {pointsSelected} votes </div>
    </div>
  )
}

const Statistics = ({anecdotes, points, text}) => {
  var mostLikedAnecdote = 0
  var mostVotes = 0

  for (let i = 0; i < points.length; i++) {
    if (points[i] > mostVotes) {
        mostVotes = points[i];
        mostLikedAnecdote = i
    }
  };
  return (
    <div>
      <Display header={text} selectedAnecdote={anecdotes[mostLikedAnecdote]} pointsSelected={points[mostLikedAnecdote]} />
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const initialArray = Array(8).fill(0)
  const [points, setVoted] = useState(initialArray)

  const setToSelected = () => {
    console.log('changing, value before', selected)
    setSelected(Math.floor(Math.random() * 8));
  }

  const setToVoted = () => {
    const copy = [...points]
    copy[selected] += 1;
    console.log(copy[selected])
    setVoted(copy)
  }

  return (
    <div>
      <Display header="Anecdote of the day" selectedAnecdote={anecdotes[selected]} pointsSelected={points[selected]} />
      <Button onClick={setToVoted} text="vote" />
      <Button onClick={setToSelected} text="next anecdote" />
      <Statistics anecdotes={anecdotes} points={points} text="Anecdote with most votes"/>
    </div>
  )
}

export default App
