import { useState } from 'react'
import blogs from '../services/blogs'

const Blog = ({ blog, addLikes, user, removeBlog }) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
    const showDelete = { display: user.name === blog.user.name ? '' : 'none' }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    return (
        <div style={blogStyle}>
            <div style={hideWhenVisible} className="hiddenBlog">
                {blog.title} {blog.author}
                <button onClick={() => setVisible(true)}>view</button>
            </div>
            <div style={showWhenVisible} className="visibleBlog">
                <div>
                    {blog.title} {blog.author}
                    <button onClick={() => setVisible(false)}>hide</button>
                </div>
                <div>{blog.url}</div>
                <div data-testid="number_of_likes">
                    {blog.likes}
                    <button onClick={() => addLikes(blog.id)}>like</button>
                </div>
                <div>{blog.user.name}</div>
                <div style={showDelete} data-testid="removeButton">
                    <button onClick={() => removeBlog(blog.id)}>remove</button>
                </div>
            </div>
        </div>
    )
}

export default Blog
