import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";
import Recommendations from "./components/Recommendations";
import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS } from './queries'
import { ALL_BOOKS } from './queries'
import { ME } from './queries'


const App = () => {
  
  const [token, setToken] = useState(null)
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_AUTHORS)
  const result2 = useQuery(ALL_BOOKS)
  const client = useApolloClient()
  const result3 = useQuery(ME)

  
  if (result.loading)  {
    return <div>loading...</div>
  }

  if (result2.loading)  {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }



  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button hidden={!token} onClick={() => setPage("add")}>add book</button>
        <button hidden={!token} onClick={logout}>logout</button>
        <button hidden={token} onClick={() => setPage("login")}>login</button>
        <button hidden={!token} onClick={() => setPage("recommended")}>recommendations</button>
      </div>

      <Notify errorMessage={errorMessage} />
      <Authors authors={result.data.allAuthors} show={page === "authors"} token={token}/>
      <Books books={result2.data.allBooks} show={page === "books"}  />
      <Recommendations books={result2.data.allBooks} user={result3.data.me} show={page === "recommended"} />
      <NewBook show={page === "add"} setError={notify} />
      <LoginForm show={page === "login"} setToken={setToken} setError={notify} />
    </div>
  );
};

export default App;
