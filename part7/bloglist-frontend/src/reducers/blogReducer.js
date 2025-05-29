import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'



const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    removingBlog(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { updateBlog, appendBlog, setBlogs, removingBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    console.log("new blog", newBlog)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog)
    dispatch(updateBlog(updatedBlog))
  }
}

export const deletingBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(initializeBlogs())
  }
}
export default blogSlice.reducer