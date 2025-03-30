const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {

  var favoriteBlog = blogs[0]
  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > favoriteBlog.likes) {
      favoriteBlog = blogs[i]
    }
  }
  return favoriteBlog
}

const mostBlogs = (blogs) => {

  var authors = _.groupBy(blogs, 'author')
  var authors_and_blogs = _.map(authors, (blogList, author) => ({ author, blogs: blogList.length }))
  var mostBlogs = _.maxBy(authors_and_blogs, 'blogs')
  return mostBlogs
}

const mostLikes = (blogs) => {

  var authors = _.groupBy(blogs, 'author')
  var authors_and_likes = _.map(authors, (blogList, author) => ({ author, likes: blogList.reduce((sum, blog) => sum + blog.likes, 0) }))
  var mostLikes = _.maxBy(authors_and_likes, 'likes')
  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
