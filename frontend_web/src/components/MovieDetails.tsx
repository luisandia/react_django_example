import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import uuid from 'react-uuid'
import { ApiService, Movie } from '../Generated'

interface Props {
  movie?: Movie | null
  updateMovie: (movie: Movie) => void
}

const MovieDetails = (props: Props) => {
  const [highlighted, setHighlighted] = useState(-1)
  const { movie } = props

  const highlightRate = (high: any) => () => {
    setHighlighted(high)
  }

  const rateClicked = (rate: any) => async () => {
    try {
      movie!.stars = rate + 1
      const { id } = movie!
      await ApiService.rateMovieMovie(id!.toString(), movie!)
      getDetails()
    } catch (e) {
      console.error(e)
    }
  }

  const getDetails = async () => {
    try {
      const { id } = movie!
      const response = await ApiService.retrieveMovie(id!.toString())
      props.updateMovie(response)
    } catch (e) {
      console.error(e)
    }
  }

  const avgRating = +movie?.avg_rating!

  return (
    <>
      {movie ? (
        <div>
          <h1>{movie.title}</h1>
          <p>{movie.description}</p>
          <FontAwesomeIcon
            icon={faStar}
            className={avgRating! > 0 ? 'orange' : ''}
          />
          <FontAwesomeIcon
            icon={faStar}
            className={avgRating > 1 ? 'orange' : ''}
          />
          <FontAwesomeIcon
            icon={faStar}
            className={avgRating > 2 ? 'orange' : ''}
          />
          <FontAwesomeIcon
            icon={faStar}
            className={avgRating > 3 ? 'orange' : ''}
          />
          <FontAwesomeIcon
            icon={faStar}
            className={avgRating > 4 ? 'orange' : ''}
          />
          ({movie.no_of_ratings})
          <div className="rate-container">
            <h2>Rate it</h2>
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon
                key={uuid()}
                icon={faStar}
                className={highlighted > i - 1 ? 'purple' : ''}
                onMouseEnter={highlightRate(i)}
                onMouseLeave={highlightRate(-1)}
                onClick={rateClicked(i)}
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  )
}

export default MovieDetails
