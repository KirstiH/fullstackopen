import { createSlice} from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      setNotification(state, action) {
        return action.payload
      },
      removeNotification(){
        return null
      }
    }
})

export const setNotificationWithTime = (content, time) => {
  return async dispatch => {
    dispatch(setNotification(content, time))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export const {setNotification, removeNotification} = notificationSlice.actions

export default notificationSlice.reducer