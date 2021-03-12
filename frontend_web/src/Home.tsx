import { faFilm, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { ApiService, Movie } from './Generated'
import './App.css'
import MovieDetails from './components/MovieDetails'
import MovieForm from './components/MovieForm'
import MovieList from './components/MovieList'
import { useFetch } from './hooks/useFetch'

function Home() {
  const [movies, setMovies] = useState<any>([])
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [editedMovie, setEditedMovie] = useState<Movie | null>(null)
  const [token, , removeCookie] = useCookies(['mr-token'])
  const [data, loading, error] = useFetch()

  useEffect(() => {
    setMovies(data)
  }, [data])

  useEffect(() => {
    if (!token['mr-token']) window.location.href = '/login'
  }, [token])

  const movieClicked = (movie: Movie) => {
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
      await ApiService.destroyMovie(movie.id!.toString())
      const newMovies = movies.filter((mov: Movie) => mov.id !== movie.id)
      setMovies(newMovies)
    } catch (er) {
      console.error(er)
    }
  }

  const logoutUser = () => {
    removeCookie('mr-token')
  }

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error loading movies</h1>

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <FontAwesomeIcon icon={faFilm} />
          <span>Movie rater</span>
        </h1>
        <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser} />
      </header>
      <div className="layout">
        <div>
          <MovieList
            movies={movies}
            movieClicked={movieClicked}
            editClicked={editClicked}
            removeClicked={removeClicked}
          />
          <button type="button" onClick={newMovie}>
            New movie
          </button>
        </div>
        <MovieDetails movie={selectedMovie} updateMovie={movieClicked} />
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
