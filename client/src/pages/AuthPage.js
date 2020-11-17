import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hook'

export const AuthPage = () => {
  const { loading, error, request } = useHttp()
  const [form, setForm] = useState({
    email: '',
    password: '',
    nickName: '',
    firstName: '',
    lastName: ''
  })

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
    } catch (e) { }
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Страница входа</h1>
        <div className="card">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>

              <div className="input-field">
                <input
                  id="email"
                  type="text"
                  name="email"
                  // value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Введите email*</label>
              </div>

              <div className="input-field">
                <input
                  id="password"
                  type="password"
                  name="password"
                  // value={form.password}
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
                />
                <label htmlFor="nickName">Введите ник</label>
              </div>

              <div className="input-field">
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  onChange={changeHandler}
                />
                <label htmlFor="firstName">Введите имя</label>
              </div>

              <div className="input-field">
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  onChange={changeHandler}
                />
                <label htmlFor="lastName">Введите фамилию</label>
              </div>

            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4 mr-10"
              disabled={loading}
            >
              Вход
            </button>
            <button
              className="btn blue darken-4"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}