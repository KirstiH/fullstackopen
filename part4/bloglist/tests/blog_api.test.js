const { test, after, beforeEach, describe } = require('node:test')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const assert = require('node:assert')
const api = supertest(app)

describe('when there are some blogs saved initially', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
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
})

describe('adding a new blog with required minimum fields', () => {
  test('a new blog is successfully added', async () => {
    const newBlog = {
      title: 'React patterns with JS',
      author: 'Michael Wells',
      url: 'https://reactpatterns.com',
      likes: 0,
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
})

describe('deleting a blog', () => {
  test('a blog can be deleted', async () => {

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map(r => r.title)
    assert(!titles.includes(blogToDelete.title))
  })
})

describe('updating a blog', () => {
  test('number of likes can be updated', async () => {

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[1]

    const updatedBlog = {
      'title': 'HTML is easy!',
      'author': 'Friedrich',
      'url': 'https://html.com',
      'likes': 20
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    assert.strictEqual(blogToUpdate.likes, 0)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

describe('testing if new user cannot be created with too short password and username', () => {
  test('password must be at least 3 characters long', async () => {
    const newUser = {
      username: 'Salla',
      name: 'Salla',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('password must be at least 3 characters long'))
  })

  test('username must be at least 3 characters long', async () => {

    const newUser = {
      username: 'sa',
      name: 'Salla',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('is shorter than the minimum allowed length'))
  })

  test('username must be unique', async () => {

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('expected `username` to be unique'))
  })
})

after(async () => {
  await mongoose.connection.close()
})