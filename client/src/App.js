import { BrowserRouter as Router } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import MiniDrawer from './components/MiniDrawer'
import { Footer } from './components/Footer'
import PopupMessage from './components/Popup'

function App() {
  const { token, login, logout, userId, role } = useAuth()
  const isAuthenticated = !!token

  return (
    <AuthContext.Provider value={{ token, login, logout, userId, role, isAuthenticated }}>
      <Router>
        <MiniDrawer />
        <Footer />
        <PopupMessage />
      </Router>
    </AuthContext.Provider>
  )
}

export default App
