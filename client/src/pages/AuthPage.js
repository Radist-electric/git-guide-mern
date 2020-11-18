import React, { useEffect, useState, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

export const AuthPage = () => {
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

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

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
    } catch (e) { }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      message(data.message)
      auth.login(data.token, data.userId)
      
    } catch (e) { }
  }

  const regToggler = () => {
    setRegister(!register)
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Страница входа</h1>
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
                />
                <label htmlFor="email">Введите email*</label>
              </div>

              <div className="input-field">
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={changeHandler}
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
                />
                <label htmlFor="lastName">Введите фамилию</label>
              </div>

            </div>
          </div>

          <div className="card-action">
            <div className="row">
              <button
                className="btn blue darken-4 col s4"
                onClick={register === true ? registerHandler : loginHandler}
                disabled={loading}
              >
                {register === true ? "Зарегистрироваться" : "Войти"}
              </button>
              <div className="col s4 offset-s4 right-align">
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