import MovieCard from '../MovieCard'

import './index.css'

const MovieList = ({movies}) => {
  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </div>
  )
}

export default MovieList
