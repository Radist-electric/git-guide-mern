import { useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useHistory, useLocation } from 'react-router-dom'
import { Loader } from '../components/Loader'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import is from 'is_js'
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
  const location = useLocation()
  const {changeRegister} = props

  useEffect(() => {
    if (location.state) {
       changeRegister(location.state.needAuth)
    }
  }, [location, changeRegister])

  useEffect(() => {
    if (error) {
      props.showPopup(error, 'error')
    }
    clearError()
  }, [error, clearError, props])

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

  const regToggler = () => {
    changeRegister(!props.register)
  }

  const pressHandler = event => {
    if (event.key === 'Enter') {
      if (props.register === true) {
        registerHandler()
      } else {
        loginHandler()
      }
    }
  }

  const renderInputs = () => {
    return Object.keys(props.formControls).map((controlName, index) => {
      const control = props.formControls[controlName]
      return (
        <TextField
          value={control.value}
          key={controlName + index}
          id={control.id}
          type={control.type}
          name={control.name}
          label={control.label}
          fullWidth={true}
          margin='normal'
          required={!!control.validation && control.validation.required}
          error={!control.valid && control.touched}
          helperText={!control.valid && control.touched && control.errorMessage}
          onKeyPress={pressHandler}
          onChange={event => onChangeHandler(event, controlName)}
        />
      )
    })
  }

  const onChangeHandler = (event, controlName) => {
    const formControls = { ...props.formControls }
    const control = { ...formControls[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valid = validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })
    props.changeformControls(formControls, isFormValid)
    props.changeForm({ ...props.form, [event.target.name]: event.target.value })
  }

  const validateControl = (value, validation) => {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  const initInputs = () => {
    props.initForm()
    props.initFormControls()
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper + ' ' + classes.bgNone} elevation={0}>
        <h1>Вход / регистрация</h1>
      </Paper>
      <Paper className={classes.paper} elevation={3}>
        <h2 className='card-title'>{props.register === true ? 'Регистрация' : 'Авторизация'}</h2>
        {renderInputs()}
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
    formControls: state.authValid.formControls,
    register: state.authRegister.register
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showPopup: (text, typeText) => dispatch({ type: 'SHOW', payload: { text, typeText } }),
    changeForm: (form) => dispatch({ type: 'CHANGE_FORM', payload: form }),
    initForm: () => dispatch({ type: 'INIT_FORM' }),
    changeformControls: (formControls, isFormValid) => dispatch({ type: 'CHANGE_FORMCONTROLS', payload: { formControls, isFormValid } }),
    initFormControls: () => dispatch({ type: 'INIT_FORMCONTROLS' }),
    changeRegister: (value) => dispatch({ type: 'CHANGE_REGISTER', payload: {value} })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)