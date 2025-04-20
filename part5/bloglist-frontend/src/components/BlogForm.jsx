/* eslint-disable react/no-unknown-property */
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState(0)

  const handleAddTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAddAuthor = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleAddUrl = (event) => {
    setNewUrl(event.target.value)
  }

  const handleAddLikes = (event) => {
    setNewLikes(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes || 0
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setNewLikes(0)
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>Title:</label>
          <input
            title={newTitle}
            onChange={handleAddTitle}
            placeholder='write blog title here'
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            author={newAuthor}
            onChange={handleAddAuthor}
            placeholder='write blog author here'
          />
        </div>
        <div>
          <label>Url:</label>
          <input
            url={newUrl}
            onChange={handleAddUrl}
            placeholder='write blog url here'
          />
        </div>
        <div>
          <label>Likes:</label>
          <input
            likes={newLikes}
            onChange={handleAddLikes}
            placeholder='write blog likes here'
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm