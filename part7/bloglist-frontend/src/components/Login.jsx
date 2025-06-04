import {Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotificationWithTime } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setUser } from '../reducers/userReducer'
import Notification from '../components/Notification'
import {
  TextField,
  Button,
} from '@mui/material'

const Login = () => {
        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')
        const dispatch = useDispatch()
        const navigate = useNavigate()

        const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username,
                password,
            })
            blogService.setToken(user.token)
            dispatch(setUser(user))
            setUsername('')
            setPassword('')
            navigate('/')
        } catch (exception) {
            dispatch(setNotificationWithTime(`Wrong credentials`, 5))
        }
    }

        return (
            <div>
                <h2>Log in to application</h2>
                <Notification />
                <form onSubmit={handleLogin}>
                    <div>
                        <TextField 
                            label="username" 
                            value={username} 
                            onChange={({ target }) => setUsername(target.value)}
                        />                  
                    </div>
                    <div>
                        <TextField 
                            label="password" 
                            type='password' 
                            value={password} 
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <Button variant="contained" color="primary" type="submit">
                        login
                    </Button>
                </form>
            </div>
        )
    }

export default Login