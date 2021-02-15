import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useCookies } from 'react-cookie'
import { Movie } from '../ApiGenerated'
// import { API } from '../api-service'

function MovieList(props: any) {
  const { movieClicked, removeClicked, editClicked } = props
  // const [token] = useCookies(['mr-token'])

  // const movieClicked = (movie: Movie) => () => {
  //   props.movieClicked(movie)
  // }
  // const editClicked = (movie: any) => {
  //   props.editClicked(movie)
  // }

  const { movies } = props

  return (
    <div>
      {movies &&
        movies.map((movie: Movie) => (
          <div key={movie.id} className="movie-item">
            <h2 onClick={movieClicked(movie)}>{movie.title}</h2>
            {/* <h2>{movie.title}</h2> */}
            <FontAwesomeIcon icon={faEdit} onClick={editClicked(movie)} />
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
