import {useEffect, useState} from 'react'
import MovieList from '../../components/MovieList'

const API_KEY = 'YOUR_API_KEY'

const PopularMovies = () => {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const getPopularMovies = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
        )

        if (!response.ok) {
          throw new Error('Unable to fetch movies')
        }

        const data = await response.json()

        setMovies(data.results)
        setTotalPages(data.total_pages)
      } catch (err) {
        setError('Failed to fetch movies')
      }

      setLoading(false)
    }

    getPopularMovies()
  }, [page])

  return (
    <div>

      {error && <p className="status">{error}</p>}

      {!loading && !error && <MovieList movies={movies} />}

      <div className="pagination">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => setPage(previousPage => previousPage - 1)}
        >
          Previous
        </button>

        <p>
          Page {page} of {totalPages}
        </p>

        <button
          type="button"
          disabled={page === totalPages}
          onClick={() => setPage(previousPage => previousPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default PopularMovies
