const middleware = require('../utils/middleware')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

blogsRouter.post(
    '/',
    middleware.userExtractor,
    async (request, response, next) => {
        const body = request.body
        const user = request.user

        const blog = new Blog({
            title: body.title,
            author: body.author || 'Anonymous',
            url: body.url,
            likes: body.likes || 0,
            user: user.id,
            comments: body.comments || [],
        })

        try {
            const savedBlog = await blog.save()
            user.blogs = user.blogs.concat(savedBlog._id)
            await user.save()

            const populatedBlog = await savedBlog.populate('user', {
                username: 1,
                name: 1,
            })
            response.status(201).json(populatedBlog)
        } catch (error) {
            next(error)
        }
    }
)

blogsRouter.post(
    '/:id/comments',
    middleware.userExtractor,
    async (request, response, next) => {
        const body = request.body
        const user = request.user

        try {
            const blog = await Blog.findById(request.params.id)
            blog.comments = blog.comments.concat(body.comments)
            await blog.save()
            response.status(200).json(blog)
        } catch (error) {
            next(error)
        }
    }
)

blogsRouter.delete(
    '/:id',
    middleware.userExtractor,
    async (request, response) => {
        const user = request.user
        const blog = await Blog.findById(request.params.id)

        if (blog.user.toString() !== user.id.toString()) {
            return response
                .status(401)
                .json({ error: 'unauthorized: only the creator can delete' })
        }
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    }
)

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
    }).populate('user', { username: 1, name: 1 })

    response.status(200).json(updatedBlog)
})

module.exports = blogsRouter
