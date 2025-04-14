import { useState } from 'react'

    const BlogForm = ({ createBlog }) => {
        const [newTitle, setNewTitle] = useState('') 
        const [newAuthor, setNewAuthor] = useState('')
        const [newUrl, setNewUrl] = useState('') 

        const handleAddTitle = (event) => {
            setNewTitle(event.target.value)
          }
        
          const handleAddAuthor = (event) => {
            setNewAuthor(event.target.value)
          }
        
          const handleAddUrl = (event) => {
            setNewUrl(event.target.value)
          }

        const addBlog = (event) => {
            event.preventDefault()
            createBlog({
              title: newTitle,
              author: newAuthor,
              url: newUrl,
            })

            setNewTitle('')
            setNewAuthor('')
            setNewUrl('')
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
                        />
                    </div>
                    <div>
                    <label>Author:</label>
                        <input
                            author={newAuthor}
                            onChange={handleAddAuthor}
                        />
                    </div>
                    <div>
                        <label>Url:</label>
                        <input
                            url={newUrl}    
                            onChange={handleAddUrl}
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