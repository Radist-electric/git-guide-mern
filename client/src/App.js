import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'

import 'materialize-css'

function App() {
  const { token, login, logout, userId } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  return (
    <div className="container">
      <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated}}>
        <Router>
          {routes}
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App
