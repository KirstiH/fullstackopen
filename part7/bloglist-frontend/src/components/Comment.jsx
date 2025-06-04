import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotificationWithTime } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import Notification from '../components/Notification'
import { updateBlog } from '../reducers/blogReducer'

const Comment = ({ blogInfo, blogs }) => {
    const [comment, setNewComment] = useState('')
    const dispatch = useDispatch()

    const handleComment = async (event) => {
            event.preventDefault()
            console.log(blogInfo)

            // const blogtoUpdate = blogs.find((blog) => blog.id === blogInfo.id)
            //         const changedBlog = { ...blogtoUpdate, comments: blogtoUpdate.comments.concat(comment) }
            
            //         blogService
            //             .update(id, changedBlog)
            //             .then((returnedBlog) => {
            //                 dispatch(updateBlog(returnedBlog))
            //             })
    
            try {
                const blog = await blogService.addComment(blogInfo.id, comment)
                //blogService.setToken(user.token)
                dispatch(updateBlog(blog))
                setNewComment('')
                dispatch(setNotificationWithTime(`Comment added`, 5))
            } catch (exception) {
                console.error('Failed to add comment:', exception.response?.data || exception.message)
                dispatch(setNotificationWithTime(`Blog could not be commented`, 5))
            }
        }


    return (
        <div>
           <form onSubmit={handleComment}>
                    <div>
                        <input
                            value={comment}
                            onChange={(event) => setNewComment(event.target.value)}
                            placeholder="haven't read this yet.."
                        />
                        <button type="submit">comment</button>
                    </div>
                </form>
        </div>
    )
}

export default Comment