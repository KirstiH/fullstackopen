import { createSlice } from '@reduxjs/toolkit'

const initialState = 'You can vote your favorite anecdote here'

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      setNotification(state, action) {
        return action.payload
      },
    }
})

export const {setNotification} = notificationSlice.actions
export default notificationSlice.reducer