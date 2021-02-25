import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Movie } from '../ApiGenerated'

interface Props {
  movieClicked: (movie: Movie) => void
  removeClicked: (movie: Movie) => void
  editClicked: (movie: Movie) => void
  movies: Movie[]
}

function MovieList(props: Props) {
  const { movieClicked, removeClicked, editClicked, movies } = props

  return (
    <div>
      {movies &&
        movies.map((movie: Movie) => (
          <div key={movie.id} className="movie-item">
            <h2 onClick={() => movieClicked(movie)}>{movie.title}</h2>
            <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(movie)} />
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => removeClicked(movie)}
            />
          </div>
        ))}
    </div>
  )
}

export default MovieList
