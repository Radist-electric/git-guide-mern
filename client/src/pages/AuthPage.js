import { useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useHistory, useLocation } from 'react-router-dom'
import { Loader } from '../components/Loader'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AuthForm from '../components/forms/AuthForm'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    position: 'relative',
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 600,
  },
  buttons: {
    marginTop: '20px'
  },
  bgNone: {
    background: 'none'
  }
}))

export const AuthPage = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const auth = useContext(AuthContext)
  const { loading, error, request, clearError } = useHttp()
  const location = useLocation()
  const { changeRegister } = props

  // Set Login or Registration mode when switching to the page
  useEffect(() => {
    if (location.state) {
      changeRegister(location.state.needAuth)
    }
  }, [location, changeRegister])

  // Show error from http
  useEffect(() => {
    if (error) {
      props.showPopup(error, 'error')
    }
    clearError()
  }, [error, clearError, props])

  // New user registration
  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...props.form })
      props.showPopup(data.message, 'success')
      changeRegister(false)
      initInputs()
      setTimeout(() => {
        props.showPopup('Войдите в систему', 'info')
      }, 3200)
    } catch (e) { }
  }

  // User login 
  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...props.form })
      props.showPopup(data.message, 'success')
      auth.login(data.token, data.userId, data.userRole, data.userNickName, data.userFirstName, data.userLastName)
      initInputs()
      if (history.length > 2) {
        history.goBack()
      } else {
        history.push('/')
      }
    } catch (e) { }
  }

  // Login/Registration toggler
  const regToggler = () => {
    changeRegister(!props.register)
  }

  // Log in or register user if Enter key is pressed
  const pressHandler = event => {
    if (event.key === 'Enter') {
      if (props.register === true) {
        registerHandler()
      } else {
        loginHandler()
      }
    }
  }

  // Clear the form
  const initInputs = () => {
    props.initForm()
    props.initFormControls()
  }

  return (
    <div className={classes.root}>
      <Paper className={[classes.paper, classes.bgNone].join(' ')} elevation={0}>
        <Typography variant="h1" component="h1">Вход / регистрация</Typography>
      </Paper>
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h2" component="h2">{props.register === true ? 'Регистрация' : 'Авторизация'}</Typography>
        <AuthForm pressHandler={pressHandler} />
        <Grid container spacing={3} className={classes.buttons}>
          <Grid item xs={12} sm={6}>
            <Button
              variant='contained'
              color='primary'
              disabled={loading || !props.isFormValid}
              fullWidth={true}
              onClick={props.register === true ? registerHandler : loginHandler}
            >
              {props.register === true ? 'Зарегистрироваться' : 'Войти'}
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              color='secondary'
              fullWidth={true}
              onClick={regToggler}
            >
              {props.register === true ? 'Авторизация' : 'Регистрация'}
            </Button>
          </Grid>
        </Grid>
        {loading && <Loader />}
      </Paper>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    form: state.authForm.form,
    isFormValid: state.authValid.isFormValid,
    register: state.authRegister.register,
    formControls: state.authValid.formControls // delete
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showPopup: (text, typeText) => dispatch({ type: 'SHOW', payload: { text, typeText } }),
    initForm: () => dispatch({ type: 'INIT_FORM' }),
    initFormControls: () => dispatch({ type: 'INIT_FORMCONTROLS' }),
    changeRegister: (value) => dispatch({ type: 'CHANGE_REGISTER', payload: { value } })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)