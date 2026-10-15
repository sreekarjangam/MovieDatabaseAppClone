import {useHistory} from 'react-router-dom'

import './index.css'

const MovieCard = ({movie}) => {
  const history = useHistory()

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image'

  const onClickViewDetails = () => {
    history.push(`/movie/${movie.id}`)
  }

  return (
    <div className="movie-card">
      <img src={imageUrl} alt={movie.title} className="movie-poster" />

      <div className="movie-card-content">
        <h2>{movie.title}</h2>

        <p>⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>

        <button
          type="button"
          className="view-details"
          onClick={onClickViewDetails}
        >
          View Details
        </button>
      </div>
    </div>
  )
}

export default MovieCard
