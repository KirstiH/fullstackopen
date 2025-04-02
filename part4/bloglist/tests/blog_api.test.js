const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const assert = require('node:assert')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  //let blogObject = new Blog(initialBlogs[0])
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  //blogObject = new Blog(initialBlogs[1])
  blogObject = new Blog(helper.initialBlogs[1])
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

  //assert.strictEqual(response.body.length, 2)
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blog has a unique id', async () => {
  const response = await api.get('/api/blogs')

  assert.notEqual(response.body[0].id, response.body[1].id)
})

test('blog has an id, not _id', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body[0]._id, undefined)
})

test('a new blog is successfully added', async () => {
  const newBlog = {
    title: 'React patterns with JS',
    author: 'Michael Wells',
    url: 'https://reactpatterns.com',
    likes: 7,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)
  assert(titles.includes('React patterns with JS'))
})

test('a blog can be posted without likes', async () => {
  const newBlog = {
    title: 'JS and React',
    author: 'Michael Philips',
    url: 'https://reactandjs.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const likes = response.body.map(r => r.likes)
  assert.strictEqual(likes[2], 0)
})

test('a blog can not be posted without url', async () => {
  const newBlog = {
    title: 'JS and React',
    author: 'Michael Philips',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  assert.notEqual(response.body.length, helper.initialBlogs.length + 1)
})

test('a blog can not be posted without title', async () => {
  const newBlog = {
    author: 'Michael Philips',
    url: 'https://reactandjs.com',
    likes: 7
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  assert.notEqual(response.body.length, helper.initialBlogs.length + 1)
})

after(async () => {
  await mongoose.connection.close()
})