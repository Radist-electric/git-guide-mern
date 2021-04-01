import { useState, useContext, useEffect, useCallback } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { connect } from 'react-redux'
import { Loader } from '../components/Loader'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import AuthForm from '../components/forms/AuthForm'

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: 700
  },
  paper: {
    position: 'relative',
    padding: theme.spacing(2),
    maxWidth: 600,
    background: 'none'
  },
  buttons: {
    marginTop: '20px'
  },
}))

export const ProfilePage = (props) => {
  const classes = useStyles()
  const auth = useContext(AuthContext)
  const [user, setUser] = useState({})
  const [showForm, setShowForm] = useState(false)
  const [dataReceived, setDataReceived] = useState(false)
  const { loading, error, request, clearError } = useHttp()
  const { userId } = auth

  // Get user data from the database
  const getUserData = useCallback(async () => {
    try {
      const data = await request('/api/auth/get', 'POST', { userId })
      setUser(data.user)
      setDataReceived(true)
    } catch (e) { }
  }, [request, userId])

  const fillForm = () => {
    const formControls = JSON.parse(JSON.stringify(props.formControls))
    formControls['email'].value = user.email
    formControls['email'].valid = true
    formControls['nickName'].value = user.nickName
    formControls['firstName'].value = user.firstName
    formControls['lastName'].value = user.lastName
    const isFormValid = false
    props.changeformControls(formControls, isFormValid)
    props.changeForm({
      email: user.email,
      nickName: user.nickName,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    })
  }

  // Clear input fields when ComponentWillUnmount
  useEffect(() => {
    return () => {
      initInputs()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Get user data once when the component is mounted
  useEffect(() => {
    if (!dataReceived) {
      getUserData()
    }
  }, [getUserData, dataReceived])

  // Fill out the form if user data received
  useEffect(() => {
    if (dataReceived) { fillForm() }
  }, [dataReceived]) // eslint-disable-line react-hooks/exhaustive-deps

  // Show error from http
  useEffect(() => {
    if (error) {
      props.showPopup(error, 'error')
    }
    clearError()
  }, [error, clearError, props])

  // Update form if Enter key is pressed
  const pressHandler = event => {
    if (event.key === 'Enter') {
      updateHandler()
    }
  }

  // Write new user data to the database
  const updateHandler = async () => {
    console.log('updateHandler', props.form)

    try {
      const data = await request('/api/auth/update', 'POST', { ...props.form, userId })
      console.log('data', data)
      props.showPopup(data.message, 'success')
      auth.login(data.token, data.result._id, data.result.role, data.result.nickName, data.result.firstName, data.result.lastName)
      // initInputs()

    } catch (e) { }

    setShowForm(false)
    setDataReceived(false)
    props.initFormControls()
  }

  const initInputs = () => {
    props.initForm()
    props.initFormControls()
  }

  return (
    <div>
      <h1>Личный кабинет</h1>
      {!dataReceived && !loading &&
        <>
          <p>Что-то пошло не так.</p>
          <p>Не удалось получить данные пользователя.</p>
        </>
      }
      {!showForm && !loading && dataReceived && <List dense={true}>
        <ListItem>
          <Avatar>{
            (user.firstName && user.lastName && user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()) ||
            (user.nickName && user.nickName[0].toUpperCase()) ||
            null}
          </Avatar>
        </ListItem>
        <ListItem>
          <span><span className={classes.bold}>Ник: </span>{user.nickName || 'Не задано'}</span>
        </ListItem>
        <ListItem>
          <span><span className={classes.bold}>Имя: </span>{user.firstName || 'Не задано'}</span>
        </ListItem>
        <ListItem>
          <span><span className={classes.bold}>Фамилия: </span>{user.lastName || 'Не задано'}</span>
        </ListItem>
        <ListItem>
          <span><span className={classes.bold}>Роль: </span>{user.role}</span>
        </ListItem>
        <ListItem>
          <span><span className={classes.bold}>Электронная почта: </span>{user.email}</span>
        </ListItem>
        <ListItem>
          <span><span className={classes.bold}>Дата регистрации: </span>{new Date(user.date).toLocaleDateString()} {new Date(user.date).toLocaleTimeString()}</span>
        </ListItem>
      </List>}
      <Paper className={classes.paper} elevation={0}>
        {loading && <Loader />}
        {showForm && <AuthForm pressHandler={pressHandler} />}
        {dataReceived && <Grid container spacing={3} className={classes.buttons}>
          {showForm && <Grid item xs={12} sm={6}>
            <Button
              variant='contained'
              color='primary'
              fullWidth={true}
              onClick={() => { setShowForm(false) }}
            >
              Назад
            </Button>
          </Grid>}
          <Grid item xs={12} sm={6}>
            <Button
              variant='contained'
              color='primary'
              disabled={(loading || !props.isFormValid) && showForm}
              fullWidth={true}
              onClick={showForm === true ? updateHandler : () => { setShowForm(true) }}
            >
              Редактировать
            </Button>
          </Grid>
        </Grid>}
      </Paper>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    form: state.authForm.form,
    isFormValid: state.authValid.isFormValid,
    formControls: state.authValid.formControls
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showPopup: (text, typeText) => dispatch({ type: 'SHOW', payload: { text, typeText } }),
    changeForm: (form) => dispatch({ type: 'CHANGE_FORM', payload: form }),
    initForm: () => dispatch({ type: 'INIT_FORM' }),
    initFormControls: () => dispatch({ type: 'INIT_FORMCONTROLS' }),
    changeformControls: (formControls, isFormValid) => dispatch({ type: 'CHANGE_FORMCONTROLS', payload: { formControls, isFormValid } })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)