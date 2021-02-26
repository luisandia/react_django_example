import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { ApiService, AuthService, OpenAPI } from '../Generated'

function Auth() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoginView, setIsLoginView] = useState(true)
  const [token, setToken] = useCookies(['mr-token'])

  useEffect(() => {
    if (token['mr-token']) window.location.href = '/'
  }, [token])

  const loginClicked = async () => {
    try {
      const response = await AuthService.createAuthToken({
        username,
        password,
      })
      setToken('mr-token', response.token)
      OpenAPI.HEADERS = {
        Authorization: `Token ${response.token}`,
      }
    } catch (e) {
      console.error(e)
    }
  }

  const registerClicked = async () => {
    try {
      await ApiService.createUser({ username, password })
      loginClicked()
    } catch (e) {
      console.error(e)
    }
  }

  const isDisabled = username.length === 0 || password.length === 0

  return (
    <div className="App">
      <header className="App-header">
        {isLoginView ? <h1>Login</h1> : <h1>Register</h1>}
      </header>
      <div className="login-container">
        <label htmlFor="username">Username</label>
        <br />
        <input
          id="username"
          type="text"
          placeholder="username"
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          id="password"
          type="password"
          placeholder="Descriptiom"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <br />
        {isLoginView ? (
          <button type="button" onClick={loginClicked} disabled={isDisabled}>
            Login
          </button>
        ) : (
          <button type="button" onClick={registerClicked} disabled={isDisabled}>
            Register
          </button>
        )}

        {isLoginView ? (
          <p onClick={() => setIsLoginView(false)}>
            You don&apos;t have an account? Register here!
          </p>
        ) : (
          <p onClick={() => setIsLoginView(true)}>
            You already have an account? Login here
          </p>
        )}
      </div>
    </div>
  )
}

export default Auth
