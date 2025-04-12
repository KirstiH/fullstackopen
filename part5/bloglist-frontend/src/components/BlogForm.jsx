const BlogForm = (props) => {
    return (
        <form onSubmit={props.addBlog}>
            <div>
                title: <input
                    value={props.newTitle}
                    onChange={props.handleAddTitle}
                />
            </div>
            <div>
                author: <input
                    value={props.newAuthor}
                    onChange={props.handleAddAuthor}
                />
            </div>
            <div>
                url: <input
                    value={props.newUrl}
                    onChange={props.handleAddUrl}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form> 
    )
}

export default BlogForm