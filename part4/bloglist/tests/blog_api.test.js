const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const api = supertest(app)

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

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 2)
})

test('blog has a unique id', async () => {
  const response = await api.get('/api/blogs')

  assert.notEqual(response.body[0].id, response.body[1].id)
})

test('blog has an id, not _id', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body[0]._id, undefined)
})

after(async () => {
  await mongoose.connection.close()
})