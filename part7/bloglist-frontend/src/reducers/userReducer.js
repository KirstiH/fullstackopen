import { createSlice} from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUser(state, action) {
        return action.payload
      },
      removeUser(state, action) {
        return null
      }
    }
})


export const {setUser, removeUser} = notificationSlice.actions

export default notificationSlice.reducer