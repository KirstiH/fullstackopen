import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import userService from './services/users'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotificationWithTime } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import '../index.css'
import { setBlogs, createBlog, updateBlog, removingBlog } from './reducers/blogReducer'
import { setUser, removeUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Routes, Route, Link, Navigate, useMatch
} from 'react-router-dom'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [messageType, setMessageType] = useState(null)
    const [users, setUsers] = useState([])

    const blogFormRef = useRef()

    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)

    const match = useMatch('/users/:id')
        const userForBlog = match 
            ? users.find(userForBlog => userForBlog.id === match.params.id)
            : null

    useEffect(() => {
        const fetchBlogs = async () => {
            if (user) {
                try {
                    const blogs = await blogService.getAll()
                    const sortedBlogs = [...blogs].sort(
                        (a, b) => b.likes - a.likes
                    )
                    dispatch(setBlogs(sortedBlogs))
                } catch (error) {
                    console.log('error fetching data', error.message)
                }
            }
        }
        fetchBlogs()
    }, [user])

    useEffect(() => {
        const fetchUsers = async () => {
            if (user) {
                try {
                    const users = await userService.getAll()
                    setUsers(users)
                } catch (error) {
                    console.log('error fetching data', error.message)
                }
            }
        }
        fetchUsers()
    }, [user])



    
    const handleLogOut = async (event) => {
        event.preventDefault()
        dispatch(removeUser(null))
    }

    const addLikes = async (id) => {
        const blogtoUpdate = blogs.find((blog) => blog.id === id)
        const changedBlog = { ...blogtoUpdate, likes: blogtoUpdate.likes + 1 }

        blogService
            .update(id, changedBlog)
            .then((returnedBlog) => {
                dispatch(updateBlog(returnedBlog))
            })
            .catch(() => {
                dispatch(setNotificationWithTime(`Blog ${changedBlog.title} by ${changedBlog.author} could not be liked`, 5))
            })
            dispatch(setNotificationWithTime(`Blog ${changedBlog.title} by ${changedBlog.author} liked`, 5))
    }

    const removeBlog = async (id) => {
        const blogToRemove = blogs.find((blog) => blog.id === id)

        if (
            confirm(`Delete ${blogToRemove.title} by ${blogToRemove.author}?`)
        ) {
            blogService
                .remove(id)
                .then(() => {
                    dispatch(removingBlog(id))
                    dispatch(setNotificationWithTime(`Blog ${blogToRemove.title} was deleted`, 5))
                })
                .catch(() => {
                    dispatch(setNotificationWithTime(`Blog ${blogToRemove.title} could not be deleted`, 5))
                })
        }
    }

    const addBlog = (blogObject) => {
        try {
            blogFormRef.current.toggleVisibility()
            dispatch(createBlog(blogObject))
            dispatch(setNotificationWithTime(`Blog ${blogObject.title} by ${blogObject.author} added`, 5))
        }
        catch (error) {
            console.log(error)
            dispatch(setNotificationWithTime(`Blog ${blogObject.title} by ${blogObject.author} could not be added here`, 5))
        }
    }


    const Home = () => {
        if (!user) {
            return null
        }
        return (
            <div>
                <h2>Blogs</h2>
                <Notification />
                <div>
                    <p>
                        {user.name} logged-in
                        <button onClick={handleLogOut}>logout</button>
                    </p>
                </div>
                <Togglable buttonLabel="new blog" ref={blogFormRef}>
                    <BlogForm createBlog={addBlog} />
                </Togglable>
                <div>
                    {blogs.map(blog => 
                        <Blog
                            key={blog.id}
                            blog={blog}
                            addLikes={addLikes}
                            user={user}
                            removeBlog={removeBlog}
                        />
                    )}
                </div>
            </div>
        )
    }

    const UsersList = () => {
        return (
            <div>
                <table>
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Blogs</th>
                    </tr>
                </thead>
                {users.map(user => 
                    <UserInfo
                        key={user.id}
                        user={user}
                        blogs={user.blogs}
                    />
                )}
                </table>
            </div>
        )
    }

    const UserInfo = ({ user, blogs }) => {
    return (
        <tbody>
            <tr>
                <td>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{blogs.length}</td>
            </tr>
        </tbody>
    )
}

    const Users = () => {
        return (
            <div>
                <h2>Blogs</h2>
                <Notification />
                <div>
                    <p>
                        {user.name} logged-in
                        <button onClick={handleLogOut}>logout</button>
                    </p>
                </div>
                <h2>Users</h2>
                <UsersList />
            </div>
        )
    }

    const User = ({ userForBlog }) => {
        if (!userForBlog) {
            return <p>User not found</p>
        }
        return (
            <div>
                <h2>{userForBlog.name}</h2>
                <h3>added blogs</h3>
                {blogs.filter(blog => blog.user.id === userForBlog.id).map(blog =>
                    <Blogs
                        key={blog.id}
                        blog={blog}
                    />
                )}
            </div>
        )
    }

    const Blogs = ({ blog }) => {
        return (
            <ul>
                <li>{blog.title}</li>
            </ul>
        )
    }



    const padding = {
        padding: 5
    }

    return (
        <div>
        <div>
            <Link style={padding} to="/">home</Link>
            <Link style={padding} to="/users">users</Link>
            {user
                ? <em>{user.name} logged in</em>
                : <Link style={padding} to="/login">login</Link>
            }
        </div>

        <Routes>
            <Route path="/users/:id" element={<User userForBlog={userForBlog} />} />
            <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
        </Routes>
        <div>
            <i>Note app, Department of Computer Science 2024</i>
        </div>
     </div>
  )
}

export default App
