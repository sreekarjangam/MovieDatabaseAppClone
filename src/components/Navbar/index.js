import {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'

import './index.css'

const Navbar = () => {
  const [searchInput, setSearchInput] = useState('')
  const history = useHistory()

  const onSearch = event => {
    event.preventDefault()

    const query = searchInput.trim()

    if (query !== '') {
      history.push(`/search/${encodeURIComponent(query)}`)
    }
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <h1 className="logo-heading">movieDB</h1>
      </Link>

      <div className="nav-links">
        <Link to="/" className="nav-link">
          Popular
        </Link>

        <Link to="/top-rated" className="nav-link">
          Top Rated
        </Link>

        <Link to="/upcoming" className="nav-link">
          Upcoming
        </Link>
      </div>

      <form className="search-form" onSubmit={onSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Search movies..."
          value={searchInput}
          onChange={event => setSearchInput(event.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </nav>
  )
}

export default Navbar