/* eslint-disable react/no-unknown-property */
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [newLikes, setNewLikes] = useState(0)

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl,
            likes: newLikes || 0,
        })

        console.log(newTitle, newAuthor, newUrl, newLikes)
        console.log('new blog added', createBlog)

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
                        data-testid="title"
                        value={newTitle}
                        onChange={(event) => setNewTitle(event.target.value)}
                        placeholder="write blog title here"
                    />
                </div>
                <div>
                    <label>Author:</label>
                    <input
                        data-testid="author"
                        value={newAuthor}
                        onChange={(event) => setNewAuthor(event.target.value)}
                        placeholder="write blog author here"
                    />
                </div>
                <div>
                    <label>Url:</label>
                    <input
                        data-testid="url"
                        value={newUrl}
                        onChange={(event) => setNewUrl(event.target.value)}
                        placeholder="write blog url here"
                    />
                </div>
                <div>
                    <label>Likes:</label>
                    <input
                        data-testid="likes"
                        value={newLikes}
                        onChange={(event) => setNewLikes(event.target.value)}
                        placeholder="write blog likes here"
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
