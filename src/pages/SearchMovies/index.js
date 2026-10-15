import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

import MovieList from '../../components/MovieList'

const API_KEY = 'YOUR_API_KEY'

const SearchMovies = () => {
  const {movieName} = useParams()

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const getSearchMovies = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
            movieName,
          )}&page=1`,
        )

        if (!response.ok) {
          throw new Error('Unable to search movies')
        }

        const data = await response.json()

        setMovies(data.results)
      } catch (err) {
        setError('Failed to search movies')
      }

      setLoading(false)
    }

    getSearchMovies()
  }, [movieName])

  return (
    <div>
      <h1 className="page-title">Search Results for "{movieName}"</h1>

      {loading && <p className="status">Loading...</p>}

      {error && <p className="status">{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p className="status">No movies found</p>
      )}

      {!loading && !error && movies.length > 0 && <MovieList movies={movies} />}
    </div>
  )
}

export default SearchMovies
