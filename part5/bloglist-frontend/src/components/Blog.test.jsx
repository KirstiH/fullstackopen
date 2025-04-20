import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders title and author', () => {
  const blog = {
    author: 'Kirsti',
    title: 'Component testing',
    url: 'https://react-testing-library.com',
    likes: 3,
    user: {
      _id: '100',
      username: 'Kirsti',
      name: 'Kirsti',
    },
  }

  const user = {
    _id: '100',
    username: 'Kirsti',
    name: 'Kirsti',
  }


  const { container } = render(<Blog blog={blog} user={user} />)

  const elementTitle = screen.findByText('Component testing')
  expect(elementTitle).toBeDefined()
  const elementAuthor = screen.findByText('Kirsti')
  expect(elementAuthor).toBeDefined()

  const div = container.querySelector('.hiddenBlog')
  expect(div).not.toHaveTextContent('https://react-testing-library.com')
  expect(div).not.toHaveTextContent(3)

})

test('renders likes and url besides author and title', async () => {
  const blog = {
    author: 'Kirsti',
    title: 'Component testing',
    url: 'https://react-testing-library.com',
    likes: 3,
    user: {
      _id: '100',
      username: 'Kirsti',
      name: 'Kirsti',
    },
  }

  const user = userEvent.setup()
  const { container } = render(<Blog blog={blog} user={user} />)

  const button = screen.getByText('view')
  await user.click(button)


  const elementTitle = screen.findByText('Component testing')
  expect(elementTitle).toBeDefined()
  const elementAuthor = screen.findByText('Kirsti')
  expect(elementAuthor).toBeDefined()

  const div = container.querySelector('.visibleBlog')
  expect(div).toHaveTextContent('https://react-testing-library.com')
  expect(div).toHaveTextContent(3)

})