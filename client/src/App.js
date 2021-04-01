import { BrowserRouter as Router } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import MiniDrawer from './components/MiniDrawer'
import { Footer } from './components/Footer'
import PopupMessage from './components/Popup'

function App() {
  const { token, login, logout, userId, ready, role, userNickName, userFirstName, userLastName } = useAuth()
  const isAuthenticated = !!token

  return (
    <AuthContext.Provider value={{ login, logout, token, userId, role, userNickName, userFirstName, userLastName, isAuthenticated, ready }}>
      <Router>
        <MiniDrawer />
        <Footer />
        <PopupMessage />
      </Router>
    </AuthContext.Provider>
  )
}

export default App
