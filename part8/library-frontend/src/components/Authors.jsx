import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import Select from 'react-select';


const Authors = ({authors, show, token}) => {
  
  const [name, setName] = useState('')
  const [bornYear, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null);
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
      refetchQueries: [ { query: ALL_AUTHORS } ],
  })

  if (!show) {
    return null
  }

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setName(selectedOption.value)
  };

   const setBirthYear = async (event) => {
    event.preventDefault()

    const born = parseInt(bornYear)
    console.log(name, born)

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
      <h2 hidden={token === null}>Set birthyear</h2>
      <div>
        <form hidden={token === null} onSubmit={setBirthYear}>
          <div>
            <Select
              defaultValue={selectedOption}
              onChange={handleChange}
              options={authors.map(a => ({ value: a.name, label: a.name }))}
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
