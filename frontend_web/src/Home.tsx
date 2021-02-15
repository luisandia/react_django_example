import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import MovieDetails from './components/MovieDetails'
import MovieForm from './components/MovieForm'
import { ApiService, Movie } from './ApiGenerated'
// import logo from './logo.svg'
import './App.css'
import MovieList from './components/MovieList'
import { useFetch } from './hooks/useFetch'

// OpenAPI.BASE = 'http://localhost:8000'

function Home() {
  // return<div>hola</div>
  const [movies, setMovies] = useState<any>([])
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [editedMovie, setEditedMovie] = useState<Movie | null>(null)

  const [data, loading, error] = useFetch()

  useEffect(() => {
    setMovies(data)
  }, [data])

  // useEffect(() => {
  //   if (!token['mr-token']) window.location.href = '/'
  // }, [token])

  const loadMovie = (movie: Movie) => {
    setSelectedMovie(movie)
    setEditedMovie(null)
  }
  const editClicked = (movie: Movie) => {
    setEditedMovie(movie)
    setSelectedMovie(null)
  }
  const updatedMovie = (movie: Movie) => {
    const newMovies = movies.map((mov: any) => {
      if (mov.id === movie.id) {
        return movie
      }
      return mov
    })
    setMovies(newMovies)
  }
  const newMovie = () => {
    setEditedMovie({ title: '', description: '' })
    setSelectedMovie(null)
  }

  const movieCreated = (movie: Movie) => {
    const newMovies = [...movies, movie]
    setMovies(newMovies)
  }
  const removeClicked = async (movie: Movie) => {
    try {
      await ApiService.destroyMovie(movie.id!.toString()) //  API.deleteMovie(movie.id, token['mr-token'])
      const newMovies = movies.filter((mov: Movie) => mov.id !== movie.id)
      setMovies(newMovies)
    } catch (er) {
      console.error(er)
    }
  }
  // const logoutUser = () => {
  //   deleteToken('mr-token')
  // }

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error loading movies</h1>

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <FontAwesomeIcon icon={faFilm} />
          <span>Movie rater</span>
        </h1>
        {/* <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser} /> */}
      </header>
      <div className="layout">
        <div>
          <MovieList
            movies={movies}
            movieClicked={loadMovie}
            editClicked={editClicked}
            removeClicked={removeClicked}
          />
          <button type="button" onClick={newMovie}>
            New movie
          </button>
        </div>
        <MovieDetails movie={selectedMovie} updateMovie={loadMovie} />
        {editedMovie ? (
          <MovieForm
            movie={editedMovie}
            updatedMovie={updatedMovie}
            movieCreated={movieCreated}
          />
        ) : null}
      </div>
    </div>
  )
}

export default Home
