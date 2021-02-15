import React from 'react'
// import logo from './logo.svg'
// import './App.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFilm, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from 'react-cookie'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ApiContext from './Api/ApiContext'
// import MovieList from './components/MovieList'
// import MovieDetails from './components/MovieDetails'
// import MovieForm from './components/MovieForm'
import { ApiService, OpenAPI } from './ApiGenerated'
import Home from './Home'
import { useFetch } from './hooks/useFetch'

OpenAPI.BASE = 'http://localhost:8000'
function App() {
  // ApiService.listMovies().then((response) => {
  //   debugger
  //   console.log(response)
  // })

  // return<div>hola</div>
  // const [movies, setMovies] = useState<any>([])
  // const [selectedMovie, setSelectedMovie] = useState(null)
  // const [editedMovie, setEditedMovie] = useState<any>(null)
  // const [data, loading, error] = useFetch()

  // useEffect(() => {
  //   setMovies(data)
  // }, [data])

  // useEffect(() => {
  //   if (!token['mr-token']) window.location.href = '/'
  // }, [token])

  // const loadMovie = (movie: any) => {
  //   setSelectedMovie(movie)
  //   setEditedMovie(null)
  // }
  // const editClicked = (movie: any) => {
  //   setEditedMovie(movie)
  //   setSelectedMovie(null)
  // }
  // const updatedMovie = (movie: any) => {
  //   const newMovies = movies.map((mov: any) => {
  //     if (mov.id === movie.id) {
  //       return movie
  //     }
  //     return mov
  //   })
  //   setMovies(newMovies)
  // }
  // const newMovie = () => {
  //   setEditedMovie({ title: '', description: '' })
  //   setSelectedMovie(null)
  // }

  // const movieCreated = (movie: any) => {
  //   const newMovies = [...movies, movie]
  //   setMovies(newMovies)
  // }
  // const removeClicked = (movie: any) => {
  //   const newMovies = movies.filter((mov: any) => mov.id !== movie.id)
  //   setMovies(newMovies)
  // }
  // const logoutUser = () => {
  //   deleteToken('mr-token')
  // }

  // if (loading) return <h1>Loading...</h1>
  // if (error) return <h1>Error loading movies</h1>

  return (
    <ApiContext.Provider value={{ state: { token: '' } }}>
      <Router>
        <Route exact path="/" component={Home} />
        {/* <Route exact path="/" component={Auth} /> */}
      </Router>
    </ApiContext.Provider>
  )
}

export default App
