const Recommendations = ({ books, user, show }) => {
  if (!show) {
    return null
  }

  let recommendedBooks = []
  if (user) {
    const favoriteGenre = user.favoriteGenre
    recommendedBooks = books.filter((book) => book.genres.includes(favoriteGenre))
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre patterns</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
