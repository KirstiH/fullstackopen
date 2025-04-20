import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> sends a new blog', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const input1 = screen.getByPlaceholderText('write blog title here')
  const input2 = screen.getByPlaceholderText('write blog author here')
  const input3 = screen.getByPlaceholderText('write blog url here')
  const sendButton = screen.getByText('add')

  await user.type(input1, 'Test title')
  await user.type(input2, 'Test author')
  await user.type(input3, 'Test url')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Test title')
  expect(createBlog.mock.calls[0][0].author).toBe('Test author')
  expect(createBlog.mock.calls[0][0].url).toBe('Test url')
})