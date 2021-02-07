export class API {
  static loginUser(body:any) {
    return fetch(`http://127.0.0.1:8000/auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( body )
    }).then( resp => resp.json())
  }
  static registerUser(body:any) {
    return fetch(`http://127.0.0.1:8000/api/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( body )
    }).then( resp => resp.json())
  }

  static getMovies(token:any){
    return fetch("http://127.0.0.1:8000/api/movies/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}` 
      }
    }).then( resp => resp.json())
  }
  static updateMovie(mov_id:any, body:any, token:any) {
    return fetch(`http://127.0.0.1:8000/api/movies/${mov_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify( body )
    }).then( resp => resp.json())
  }
  static createMovie(body:any, token:any) {
    return fetch(`http://127.0.0.1:8000/api/movies/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify( body )
    }).then( resp => resp.json())
  }
  static deleteMovie(mov_id:any, token:any) {
    return fetch(`http://127.0.0.1:8000/api/movies/${mov_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    })
  }
}