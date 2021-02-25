import React from 'react'
import { CookiesProvider } from 'react-cookie'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { OpenAPI } from './ApiGenerated'
import Auth from './components/Auth'
import Home from './Home'

OpenAPI.BASE = 'http://localhost:8000'

function App() {
  return (
    <CookiesProvider>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Auth} />
      </Router>
    </CookiesProvider>
  )
}

export default App
