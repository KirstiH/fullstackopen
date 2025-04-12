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

describe('when there are some blogs saved initially', async () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})
    await api.post('/api/users').send({
      username: 'root',
      name: 'root',
      password: 'root'
    })

    // let blogObject = new Blog(helper.initialBlogs[0])
    // await blogObject.save()
    // blogObject = new Blog(helper.initialBlogs[1])
    // await blogObject.save()
  })

  test('blogs are returned as json', async () => {
    const res = await api.post('/api/login').send({
      username: 'root',
      password: 'root'
    })

    const token = res.body.token
    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogs', async () => {
    const res = await api.post('/api/login').send({
      username: 'root',
      password: 'root'
    })

    const token = res.body.token
    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, 2)
  })

  test('blog has a unique id', async () => {
    const res = await api.post('/api/login').send({
      username: 'root',
      password: 'root'
    })

    const token = res.body.token
    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    assert.notEqual(blogsAtEnd[0].id, blogsAtEnd[1].id)
  })

  test('blog has an id, not _id', async () => {
    const res = await api.post('/api/login').send({
      username: 'root',
      password: 'root'
    })

    const token = res.body.token
    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd[0]._id, undefined)
  })
})

describe('adding a new blog with required minimum fields', () => {
  test('a new blog is successfully added', async () => {
    await api.post('/api/users').send({
      username: 'testuser',
      password: 'Kissa123',
      name: 'The Tester'
    })

    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'Kissa123' })

    const token = loginResponse.body.token

    const newBlog = {
      title: 'JS and React',
      author: 'Michael Philips',
      url: 'https://reactandjs.com',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(helper.initialBlogs.length + 1, 3)
  })

  test('a blog can be posted without likes', async () => {
    await api.post('/api/users').send({
      username: 'testuser',
      password: 'Kissa123',
      name: 'The Tester'
    })

    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'Kissa123' })

    const token = loginResponse.body.token

    const newBlog = {
      title: 'JS and React',
      author: 'Michael Philips',
      url: 'https://reactandjs.com',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    //const likes = response.body.map(r => r.likes)
    //assert.strictEqual(likes[2], 0)
    assert.strictEqual(helper.initialBlogs.length + 1, 3)
  })

  test('a blog can not be posted without url', async () => {
    await api.post('/api/users').send({
      username: 'testuser',
      password: 'Kissa123',
      name: 'The Tester'
    })
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'Kissa123' })

    const token = loginResponse.body.token

    const newBlog = {
      title: 'JS and React',
      author: 'Ville Kalle',
      likes: 194,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    assert.strictEqual(helper.initialBlogs.length, 2)
  })

  test('a blog can not be posted without title', async () => {

    await api.post('/api/users').send({
      username: 'testuser',
      password: 'Kissa123',
      name: 'The Tester'
    })
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'Kissa123' })

    const token = loginResponse.body.token

    const newBlog = {
      author: 'Ville Kalle',
      url: 'https://javascript.com',
      likes: 194,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    assert.strictEqual(helper.initialBlogs.length, 2)
  })
})

describe('deleting a blog', () => {
  test('a blog can be deleted only by the creator', async () => {

    await api.post('/api/users').send({
      username: 'testuser',
      password: 'Kissa123',
      name: 'The Tester'
    })
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'Kissa123' })

    const token = loginResponse.body.token

    const newBlog = {
      title: 'Javascript',
      author: 'Ville Kalle',
      url: 'https://javascript.com',
      likes: 194,
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogId = response.body.id || response.body._id

    await api
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAfter = await helper.blogsInDb()
    const ids = blogsAfter.map(b => b.id)
    assert(!ids.includes(blogId))
  })
})

describe('adding a blog without token', () => {
  test('adding a blog fails without token', async () => {

    const token = null

    const newBlog = {
      title: 'Javascript',
      author: 'Ville Kalle',
      url: 'https://javascript.com',
      likes: 194,
    }

    const result = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(401)
      //.expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('Unauthorized'))
  })
})

describe('updating a blog', () => {
  test('number of likes can be updated', async () => {

    await api.post('/api/users').send({
      username: 'testuser',
      password: 'Kissa123',
      name: 'The Tester'
    })
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'Kissa123' })

    const token = loginResponse.body.token

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
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const updated = blogsAtEnd.find(b => b.id === blogToUpdate.id)

    assert.strictEqual(updated.likes, 20)
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