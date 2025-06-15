import { useState } from 'react'

const Books = ({ books, show }) => {
  const [selectedGenre, setSelectedGenre] = useState(null)
  if (!show) {
    return null
  }

  const genres = []
  books.forEach((book) => {
    book.genres.forEach((genre) => {
      if (!genres.includes(genre)) {
        genres.push(genre)
      }
    })
  })

    const filteredBooks = selectedGenre
    ? books.filter((book) => book.genres.includes(selectedGenre))
    : books

  return (
    <div>
      <h2>books</h2>
      <p hidden={!selectedGenre}>in genre <strong>{selectedGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      {genres.map((a) => (
        <button key={a} onClick={() => setSelectedGenre(a)}>
          {a}
        </button>
      ))}
      <button onClick={() => setSelectedGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
