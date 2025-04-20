import { useState } from 'react'
import blogs from '../services/blogs'

const Blog = ({ blog, addLikes, user, removeBlog }) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showDelete = { display: user.username === blog.user.username ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)


  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='hiddenBlog'>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible} className='visibleBlog'>
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setVisible(false)}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes}
          <button onClick={() => addLikes(blog.id)}>like</button>
        </div>
        <div>
          {blog.user.username}
        </div>
        <div style={showDelete}>
          <button onClick={() => removeBlog(blog.id)}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog

