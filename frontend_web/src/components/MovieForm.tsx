import React, { useEffect, useState } from 'react'
// import { API } from '../api-service';
import { useCookies } from 'react-cookie'
import { ApiService, Movie } from '../ApiGenerated'

interface Props {
  movie: Movie
  updatedMovie: (movie: Movie) => void
  movieCreated: (movie: Movie) => void
}

function MovieForm(props: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [token] = useCookies(['mr-token'])

  const { movie } = props

  useEffect(() => {
    setTitle(movie.title)
    setDescription(movie.description)
  }, [movie])

  const updateClicked = async () => {
    try {
      const { updatedMovie } = props
      const NewMovie: Movie = { title, description }
      const response = await ApiService.updateMovie(
        props.movie.id!.toString(),
        NewMovie,
      )
      updatedMovie(response)
    } catch (err) {
      console.error(err)
    }
  }

  const createClicked = async () => {
    try {
      const { movieCreated } = props
      const newMovie: Movie = { title, description }
      const response = await ApiService.createMovie(newMovie)
      movieCreated(response)
    } catch (err) {
      console.error(err)
    }
  }

  const isDisabled = title.length === 0 || description.length === 0

  return (
    <>
      {movie ? (
        <div>
          <label htmlFor="title">Title</label>
          <br />
          <input
            id="title"
            type="text"
            placeholder="title"
            value={title}
            onChange={(evt) => setTitle(evt.target.value)}
          />
          <br />
          <label htmlFor="description">Descriptiom</label>
          <br />
          <textarea
            id="description"
            placeholder="Descriptiom"
            value={description}
            onChange={(evt) => setDescription(evt.target.value)}
          />
          <br />
          {movie.id ? (
            <button type="button" onClick={updateClicked} disabled={isDisabled}>
              Update
            </button>
          ) : (
            <button type="button" onClick={createClicked} disabled={isDisabled}>
              Create
            </button>
          )}
        </div>
      ) : null}
    </>
  )
}

export default MovieForm
