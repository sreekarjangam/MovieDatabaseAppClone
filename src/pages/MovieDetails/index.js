import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'

const API_KEY = 'YOUR_API_KEY'

const MovieDetails = () => {
  const {movieId} = useParams()

  const [movie, setMovie] = useState({})
  const [cast, setCast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true)
      setError('')

      try {
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
        )

        if (!movieResponse.ok) {
          throw new Error('Unable to fetch movie details')
        }

        const movieData = await movieResponse.json()

        const castResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
        )

        if (!castResponse.ok) {
          throw new Error('Unable to fetch cast details')
        }

        const castData = await castResponse.json()

        setMovie(movieData)
        setCast(castData.cast)
      } catch (err) {
        setError('Failed to fetch movie details')
      }

      setLoading(false)
    }

    getMovieDetails()
  }, [movieId])

  if (loading) {
    return <p className="status">Loading...</p>
  }

  if (error) {
    return <p className="status">{error}</p>
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750'

  return (
    <div className="details-page">
      <Link to="/" className="back-button">
        ← Back
      </Link>

      <div className="movie-details">
        <img src={posterUrl} alt={movie.title} />

        <div className="details-content">
          <h1>{movie.title}</h1>

          <p>
            <strong>Rating:</strong> ⭐ {movie.vote_average}
          </p>

          <p>
            <strong>Duration:</strong> {movie.runtime} minutes
          </p>

          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>

          <p>
            <strong>Genres:</strong>{' '}
            {movie.genres && movie.genres.map(genre => genre.name).join(', ')}
          </p>

          <h2>Overview</h2>

          <p>{movie.overview}</p>
        </div>
      </div>

      <div className="cast-section">
        <h2>Cast</h2>

        <div className="cast-grid">
          {cast.map(actor => {
            const actorImage = actor.profile_path
              ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
              : 'https://via.placeholder.com/185x278'

            return (
              <div className="cast-card" key={actor.credit_id}>
                <img src={actorImage} alt={actor.name} />

                <h3>{actor.name}</h3>

                <p>{actor.character}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
