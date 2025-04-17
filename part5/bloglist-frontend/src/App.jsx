import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import '../index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null);

  const blogFormRef = useRef()


  useEffect(() => {
    const fetchBlogs = async() => {
    if (user){
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (error) {
        console.log("error fetching data", error.message)
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
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  const handleLogOut = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null) 
  }

  

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
  
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
      setMessage(
        `Blog ${blogObject.title} by ${blogObject.author} added`
      )
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} messageType={messageType} />
        <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
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
        <Notification message={message} messageType={messageType} />
        <div>
          <p>{user.name} logged-in
          <button onClick={handleLogOut}>logout</button>
          </p>
        </div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm 
              createBlog={addBlog}
            />
        </Togglable>
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      </div>
    )
  }
}

export default App