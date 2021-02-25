import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import uuid from 'react-uuid'
import { ApiService } from '../ApiGenerated'

function MovieDetails(props: any) {
  const [highlighted, setHighlighted] = useState(-1)
  const [token] = useCookies(['mr-token'])

  const { movie } = props

  const highlightRate = (high: any) => (evt: any) => {
    setHighlighted(high)
  }

  const rateClicked = (rate: any) => async (evt: any) => {
    try {
      movie.stars = rate + 1
      await ApiService.rateMovieMovie(movie.id, movie)
      getDetails()
    } catch (e) {
      console.error(e)
    }
  }

  const getDetails = async () => {
    try {
      const response = await ApiService.retrieveMovie(movie.id)
      props.updateMovie(response)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      {movie ? (
        <div>
          <h1>{movie.title}</h1>
          <p>{movie.description}</p>
          <FontAwesomeIcon
            icon={faStar}
            className={movie.avg_rating > 0 ? 'orange' : ''}
          />
          <FontAwesomeIcon
            icon={faStar}
            className={movie.avg_rating > 1 ? 'orange' : ''}
          />
          <FontAwesomeIcon
            icon={faStar}
            className={movie.avg_rating > 2 ? 'orange' : ''}
          />
          <FontAwesomeIcon
            icon={faStar}
            className={movie.avg_rating > 3 ? 'orange' : ''}
          />
          <FontAwesomeIcon
            icon={faStar}
            className={movie.avg_rating > 4 ? 'orange' : ''}
          />
          ({movie.no_of_ratings})
          <div className="rate-container">
            <h2>Rate it</h2>
            {[...Array(5)].map((e, i) => (
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
