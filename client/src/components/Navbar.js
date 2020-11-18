import React, { useContext } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const isAuth = auth.isAuthenticated
  const curPath = useLocation().pathname

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/auth')
  }

  return (
    <nav>
      <div className="nav-wrapper blue darken-4">
        <NavLink to="/" className="brand-logo">Git Guide</NavLink>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li className={curPath === '/' ? "active" : ""}><NavLink to="/">Главная</NavLink></li>
          <li className={curPath === '/commands' ? "active" : ""}><NavLink to="/commands">Команды Git</NavLink></li>
          {isAuth && <li className={curPath === '/interactive' ? "active" : ""}><NavLink to="/interactive">Интерактив</NavLink></li>}
          <li className={curPath === '/git' ? "active" : ""}><NavLink to="/git">Про Git</NavLink></li>
          <li className={curPath === '/about' ? "active" : ""}><NavLink to="/about">О проекте</NavLink></li>
          {!isAuth && <li className={curPath === '/auth' ? "active" : ""}><NavLink to="/auth">Авторизация</NavLink></li>}
          {isAuth && <li><a href="/" onClick={logoutHandler}>Выход</a></li>}
        </ul>
      </div>
    </nav>
  )
}