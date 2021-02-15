import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from 'react-cookie'
import uuid from 'react-uuid'
import { ApiService } from '../ApiGenerated'
import { request } from '../ApiGenerated/core/request';

function MovieDetails(props: any) {
  const [highlighted, setHighlighted] = useState(-1)
  const [token] = useCookies(['mr-token'])

  const { movie } = props

  const highlightRate = (high: any) => (evt: any) => {
    setHighlighted(high)
  }
  const rateClicked =  (rate: any) => async (evt: any) => {
  await request({
      method: 'POST',
      path: `/api/movies/${movie.id}/rate_movie/`,
      body: { stars: rate + 1 }
  });
  getDetails()
    // ApiService.rateMovieMovie(movie.id,{ stars: rate + 1 })
    // fetch(`http://127.0.0.1:8000/api/movies/${movie.id}/rate_movie/`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Token ${token['mr-token']}`,
    //   },
    //   body: JSON.stringify({ stars: rate + 1 }),
    // })
      // .then(() => getDetails())
      // .catch((error) => console.log(error))
  }
  const getDetails = () => {
    fetch(`http://127.0.0.1:8000/api/movies/${movie.id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token['mr-token']}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => props.updateMovie(resp))
      .catch((error) => console.log(error))
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
