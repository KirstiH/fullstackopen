import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotificationWithTime } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import '../index.css'

const App = () => {
    
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const [messageType, setMessageType] = useState(null)

    const blogFormRef = useRef()

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchBlogs = async () => {
            if (user) {
                try {
                    const blogs = await blogService.getAll()
                    const sortedBlogs = [...blogs].sort(
                        (a, b) => b.likes - a.likes
                    )
                    setBlogs(sortedBlogs)
                } catch (error) {
                    console.log('error fetching data', error.message)
                }
            }
        }
        fetchBlogs()
    }, [user])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username,
                password,
            })
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(setNotificationWithTime(`Wrong credentials`, 5))
            // setMessage('Wrong credentials')
            // setMessageType('error')
            // setTimeout(() => {
            //     setMessage(null)
            // }, 5000)
        }
    }
    const handleLogOut = async (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    const addLikes = async (id) => {
        const blogtoUpdate = blogs.find((blog) => blog.id === id)
        const changedBlog = { ...blogtoUpdate, likes: blogtoUpdate.likes + 1 }

        blogService
            .update(id, changedBlog)
            .then((returnedBlog) => {
                setBlogs(
                    blogs.map((blog) => (blog.id !== id ? blog : returnedBlog))
                )
            })
            .catch(() => {
                dispatch(setNotificationWithTime(`Blog ${changedBlog.title} by ${changedBlog.author} could not be liked`, 5))
                // setMessage(
                //     `Blog ${changedBlog.title} by ${changedBlog.author} could not be liked`
                // )
                // setMessageType('error')
            })
            dispatch(setNotificationWithTime(`Blog ${changedBlog.title} by ${changedBlog.author} liked`, 5))
        // setMessage(`Blog ${changedBlog.title} by ${changedBlog.author} liked`)
        // setMessageType('success')
        // setTimeout(() => {
        //     setMessage(null)
        // }, 5000)
    }

    const removeBlog = async (id) => {
        const blogToRemove = blogs.find((blog) => blog.id === id)

        if (
            confirm(`Delete ${blogToRemove.title} by ${blogToRemove.author}?`)
        ) {
            blogService
                .remove(id)
                .then(() => {
                    setBlogs(blogs.filter((blog) => blog.id !== id))
                })
                .catch(() => {
                    dispatch(setNotificationWithTime(`Blog ${blogToRemove.title} could not be deleted`, 5))
                    // setMessage(
                    //     `Blog ${blogToRemove.title} could not be deleted`
                    // )
                    // setMessageType('error')
                    // setTimeout(() => {
                    //     setMessage(null)
                    // }, 5000)
                })
             dispatch(setNotificationWithTime(`Blog ${blogToRemove.title} was deleted`, 5))   
            // setMessage(`Blog ${blogToRemove.title} was deleted`)
            // setMessageType('deletion')
            // setTimeout(() => {
            //     setMessage(null)
            // }, 5000)
        }
    }

    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()
        blogService.create(blogObject).then((returnedBlog) => {
            setBlogs(blogs.concat(returnedBlog))
        })
        dispatch(setNotificationWithTime(`Blog ${blogObject.title} by ${blogObject.author} added`, 5)) 
        // setMessage(`Blog ${blogObject.title} by ${blogObject.author} added`)
        // setMessageType('success')
        // setTimeout(() => {
        //     setMessage(null)
        // }, 5000)
    }

    if (user === null) {
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

    if (user) {
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
                    {blogs.map((blog) => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            addLikes={addLikes}
                            user={user}
                            removeBlog={removeBlog}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default App
