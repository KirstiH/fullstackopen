import { createStore } from 'redux'

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      console.log(state)
      return { 
        ...state, 
        good: state.good + 1
      }
    case 'OK':
      console.log(state)
      return {
        ...state, 
        ok: state.ok + 1
      }
    case 'BAD':
      return {
        ...state, 
        bad: state.bad + 1
      }
    case 'ZERO':
      return state = initialState
    default: return state
  }
}


export default counterReducer
