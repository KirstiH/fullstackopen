import {Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotificationWithTime } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setUser } from '../reducers/userReducer'
import Notification from '../components/Notification'

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
                        username
                        <input
                            data-testid="username"
                            type="text"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password
                        <input
                            data-testid="password"
                            type="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit">login</button>
                </form>
            </div>
        )
    }

export default Login