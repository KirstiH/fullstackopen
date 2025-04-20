import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

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


  screen.debug()


})