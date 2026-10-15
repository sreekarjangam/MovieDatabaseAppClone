import {Switch, Route, Redirect} from 'react-router-dom'

import Navbar from './components/Navbar'
import PopularMovies from './pages/PopularMovies'
import TopRatedMovies from './pages/TopRatedMovies'
import UpcomingMovies from './pages/UpcomingMovies'
import SearchMovies from './pages/SearchMovies'
import MovieDetails from './pages/MovieDetails'

const App = () => (
  <>
    <Navbar />

    <Switch>
      <Route exact path="/" component={PopularMovies} />
      <Route exact path="/top-rated" component={TopRatedMovies} />
      <Route exact path="/upcoming" component={UpcomingMovies} />
      <Route exact path="/search/:movieName" component={SearchMovies} />
      <Route exact path="/movie/:movieId" component={MovieDetails} />
      <Redirect to="/" />
    </Switch>
  </>
)

export default App