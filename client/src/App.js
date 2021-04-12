import { BrowserRouter as Router } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Footer } from './components/Footer'
import MiniDrawer from './components/MiniDrawer'
import PopupMessage from './components/Popup'

function App() {
  const { token, login, logout, userId, ready, role, userNickName, userFirstName, userLastName } = useAuth()
  const isAuthenticated = !!token
  const THEME = createMuiTheme({
    typography: {
      h1: {
        marginBottom: '10px',
        fontSize: '30px'
      },
      h2: {
        margin: '20px 0 10px',
        fontSize: '22px'
      },
      body1: {
        marginBottom: '10px'
      }
    },
    palette: {
      primary: {
        main: '#1a237e',
      }
    },
  })



  return (
    <MuiThemeProvider theme={THEME}>
      <AuthContext.Provider value={{ login, logout, token, userId, role, userNickName, userFirstName, userLastName, isAuthenticated, ready }}>
        <Router>
          <MiniDrawer />
          <Footer />
          <PopupMessage />
        </Router>
      </AuthContext.Provider>
    </MuiThemeProvider>
  )
}

export default App
