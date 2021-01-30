import React, { useEffect, useState, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'
import { useHistory, useLocation } from 'react-router-dom'
import { Loader } from '../components/Loader'
import { connect } from 'react-redux'

export const AuthPage = (props) => {
  // console.log('AuthPage props: ', props)
  const history = useHistory()
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, error, request, clearError } = useHttp()
  const [form, setForm] = useState({
    email: '',
    password: '',
    nickName: '',
    firstName: '',
    lastName: '',
    role: 'user'
  })
  const [register, setRegister] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (location.state) {
      setRegister(location.state.needAuth)
    }
  }, [location]);

  useEffect(() => {
    message(error)
    console.log('Auth useEffect: ', props);
    if(error) {
      props.showAll(error, 'error', 'top', 'center')
    }
    clearError()
  }, [error, message, clearError, props])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      message(data.message)
      props.showAll(data.message, 'success', 'top', 'center')
      setRegister(false)
      setTimeout(() => {
        message('Войдите в систему')
        props.showAll('Войдите в систему', 'success', 'top', 'center')
      }, 3200)
    } catch (e) { }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      message(data.message)
      props.showAll(data.message, 'success', 'top', 'center')
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
    <div className="row">
      <h1 className="center-align">Вход / регистрация</h1>
      <div className="col xl6 offset-xl3 l8 offset-l2 s12">
        <div className="card">
          <div className="card-content">
            <span className="card-title">{register === true ? "Регистрация" : "Авторизация"}</span>
            <div>

              <div className="input-field">
                <input
                  id="email"
                  type="text"
                  name="email"
                  onChange={changeHandler}
                  onKeyPress={pressHandler}
                />
                <label htmlFor="email">Введите email*</label>
              </div>

              <div className="input-field">
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={changeHandler}
                  onKeyPress={pressHandler}
                />
                <label htmlFor="password">Введите пароль*</label>
              </div>

              <div className="input-field">
                <input
                  id="nickName"
                  type="text"
                  name="nickName"
                  onChange={changeHandler}
                  disabled={!register}
                  onKeyPress={pressHandler}
                />
                <label htmlFor="nickName">Введите ник</label>
              </div>

              <div className="input-field">
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  onChange={changeHandler}
                  disabled={!register}
                  onKeyPress={pressHandler}
                />
                <label htmlFor="firstName">Введите имя</label>
              </div>

              <div className="input-field">
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  onChange={changeHandler}
                  disabled={!register}
                  onKeyPress={pressHandler}
                />
                <label htmlFor="lastName">Введите фамилию</label>
              </div>

            </div>
          </div>

          <div className="card-action">
            <div className="row">
              <button
                className="btn blue darken-4 col m6 s12"
                onClick={register === true ? registerHandler : loginHandler}
                disabled={loading}
              >
                {register === true ? "Зарегистрироваться" : "Войти"}
              </button>
              <div className="col m1 offset-m1 s1 offset-s5">{loading && <Loader />}</div>
              <div className="col m3 offset-m1 s5 offset-s1 right-align">
                <span
                  className="reg yellow-text text-darken-4"
                  onClick={regToggler}
                >
                  {register === true ? "Авторизация" : "Регистрация"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    text: state.text,
    typeText: state.typeText,
    vertical: state.vertical,
    horizontal: state.horizontal
  }
}

function mapDispatchToProps(dispatch) {
  return {
    show: (text, typeText) => dispatch({ type: 'SHOW', payload: { text, typeText } }),
    showAll: (text, typeText, vertical, horizontal) => dispatch({ type: 'SHOW', payload: { text, typeText, vertical, horizontal } }),
    hide: () => dispatch({ type: 'HIDE' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)