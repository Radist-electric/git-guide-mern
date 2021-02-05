import { useEffect, useState, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useHistory, useLocation } from 'react-router-dom'
import { Loader } from '../components/Loader'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    position: 'relative',
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 576,
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
  const [register, setRegister] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (location.state) {
      setRegister(location.state.needAuth)
    }
  }, [location]);

  useEffect(() => {
    if (error) {
      props.show(error, 'error', 'top', 'center')
    }
    clearError()
  }, [error, clearError, props])

  const changeHandler = event => {
    props.changeForm({ ...props.form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...props.form })
      props.show(data.message, 'success', 'top', 'center')
      setRegister(false)
      setTimeout(() => {
        props.show('Войдите в систему', 'success', 'top', 'center')
      }, 3200)
    } catch (e) { }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...props.form })
      props.show(data.message, 'success', 'top', 'center')
      auth.login(data.token, data.userId, data.userRole)
      if (history.length > 2) {
        history.goBack()
      } else {
        history.push('/')
      }
    } catch (e) { }
  }

  const regToggler = () => {
    setRegister(!register)
  }

  const pressHandler = event => {
    if (event.key === 'Enter') {
      if (register === true) {
        registerHandler()
      } else {
        loginHandler()
      }
    }
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper + ' ' + classes.bgNone} elevation={0}>
        <h1>Вход / регистрация</h1>
      </Paper>
      <Paper className={classes.paper} elevation={3}>
        <h2 className='card-title'>{register === true ? 'Регистрация' : 'Авторизация'}</h2>
        <TextField
          id='email'
          type='text'
          name='email'
          required
          autoFocus={true}
          fullWidth={true}
          margin='normal'
          onChange={changeHandler}
          onKeyPress={pressHandler}
          label='Введите email'
        />
        <TextField
          id='password'
          type='password'
          name='password'
          required
          fullWidth={true}
          margin='normal'
          onChange={changeHandler}
          onKeyPress={pressHandler}
          label='Введите пароль'
        />
        <TextField
          id='nickName'
          type='text'
          name='nickName'
          fullWidth={true}
          margin='normal'
          onChange={changeHandler}
          disabled={!register}
          onKeyPress={pressHandler}
          label='Введите ник'
        />
        <TextField
          id='firstName'
          type='text'
          name='firstName'
          fullWidth={true}
          margin='normal'
          onChange={changeHandler}
          disabled={!register}
          onKeyPress={pressHandler}
          label='Введите имя'
        />
        <TextField
          id='lastName'
          type='text'
          name='lastName'
          fullWidth={true}
          margin='normal'
          onChange={changeHandler}
          disabled={!register}
          onKeyPress={pressHandler}
          label='Введите фамилию'
        />


        <Grid container spacing={3} className={classes.buttons}>
          <Grid item xs={12} sm={6}>
            <Button
              variant='contained'
              color='primary'
              disabled={loading}
              fullWidth={true}
              onClick={register === true ? registerHandler : loginHandler}
            >
              {register === true ? 'Зарегистрироваться' : 'Войти'}
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              color='secondary'
              fullWidth={true}
              onClick={regToggler}
            >
              {register === true ? 'Авторизация' : 'Регистрация'}
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
    text: state.popup.popup.text,
    typeText: state.popup.popup.typeText,
    vertical: state.popup.popup.vertical,
    useState: state.popup.popup.horizontal,
    form: state.authForm.form
  }
}

function mapDispatchToProps(dispatch) {
  return {
    show: (text, typeText, vertical, horizontal) => dispatch({ type: 'SHOW', payload: { text, typeText, vertical, horizontal } }),
    changeForm: (form) => dispatch({type: 'CHANGE_FORM', payload: form})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)