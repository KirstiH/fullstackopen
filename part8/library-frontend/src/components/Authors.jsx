import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'


const Authors = ({authors, show}) => {
  if (!show) {
    return null
  }
  //const authors = []

  const [name, setName] = useState('')
  const [bornYear, setBorn] = useState('')
  const [ changeYear] = useMutation(EDIT_AUTHOR)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
      refetchQueries: [ { query: ALL_AUTHORS } ],
    })

   const setBirthYear = async (event) => {
    event.preventDefault()

    const born = parseInt(bornYear)

    editAuthor({ variables: { name, born } })

    setName('')
    setBorn('')
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <div>
        <form onSubmit={setBirthYear}>
          <div>
            name
            <input
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div>
            born
            <input
              type="number"
              value={bornYear}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
