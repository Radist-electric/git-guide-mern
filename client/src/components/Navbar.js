import React, { useContext, useState } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Logo from '../img/header/logo.png'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import blue from '@material-ui/core/colors/blue'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    background: blue[900]
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
}));

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
  const logoutHandler1 = () => {
    handleClose()
    auth.logout()
    history.push('/auth')
  }

  const authHandler = (needAuth) => {
    handleClose()
    history.push({
      pathname: '/auth',
      state: { needAuth }
    })
  }

  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event) => {
    console.log(event.currentTarget)
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  


  return (
    <>
      <nav className="blue darken-4">
        <div className="nav-wrapper container">
          <NavLink to="/" className="brand-logo"><img className="logo" src={Logo} alt="logo"></img></NavLink>
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
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <NavLink to="/"><img className="logo" src={Logo} alt="logo"></img></NavLink>
            </Typography>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                {!isAuth && <MenuItem onClick={() => authHandler(false)}>Вход</MenuItem>}
                {!isAuth && <MenuItem onClick={() => authHandler(true)}>Регистрация</MenuItem>}
                {isAuth && <MenuItem onClick={handleClose}>Личный кабинет</MenuItem>}
                {isAuth && <MenuItem onClick={logoutHandler1}>Выход</MenuItem>}
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  )
}