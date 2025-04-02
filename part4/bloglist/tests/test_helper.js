const Blog = require('../models/blog')

const initialBlogs = [
  {
    'title': 'Coding!',
    'author': 'Adam',
    'url': 'https://code.com',
    'likes': 105
  },
  {
    'title': 'HTML is easy!',
    'author': 'Friedrich',
    'url': 'https://html.com',
    'likes': 11
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Fullstackopen is hard!',
    author: 'Heikki',
    url: 'https://fullstackcode.com',
    likes: 5 })

  await blog.save()
  await blog.deleteOne()
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}