import React, { useContext, useState } from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useRoutes } from '../routes'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import indigo from '@material-ui/core/colors/indigo'
import Logo from '../img/header/logo.png'
import { IconMain, IconCommands, IconInteractive, IconGitHub, IconAbout, IconText } from './Icons'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  title: {
    flexGrow: 1
  },
  link: {
    color: '#000'
  },
  active: {
    backgroundColor: indigo[50]
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

export const MiniDrawer = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const history = useHistory()
  const auth = useContext(AuthContext)
  const isAuth = auth.isAuthenticated
  const role = auth.role
  const curPath = useLocation().pathname
  const routes = useRoutes(isAuth)
  const [anchorEl, setAnchorEl] = useState(null)
  const openUser = Boolean(anchorEl)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false);
  }

  const logoutHandler = () => {
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

  const profileHandler = () => {
    handleClose()
    history.push({
      pathname: '/profile'
    })
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
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
              open={openUser}
              onClose={handleClose}
            >
              {!isAuth && <MenuItem onClick={() => authHandler(false)}>Вход</MenuItem>}
              {!isAuth && <MenuItem onClick={() => authHandler(true)}>Регистрация</MenuItem>}
              {isAuth && <MenuItem onClick={() => profileHandler()}>Личный кабинет</MenuItem>}
              {isAuth && <MenuItem onClick={logoutHandler}>Выход</MenuItem>}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <NavLink to="/" className={classes.link}>
            <ListItem button className={curPath === '/' ? classes.active : ""}>
              <ListItemIcon><IconMain /></ListItemIcon>
              Главная
            </ListItem>
          </NavLink>
          <NavLink to="/commands" className={classes.link}>
            <ListItem button className={curPath === '/commands' ? classes.active : ""}>
              <ListItemIcon><IconCommands /></ListItemIcon>
              Команды Git
            </ListItem>
          </NavLink>
          {isAuth && <NavLink to="/interactive" className={classes.link}><ListItem button className={curPath === '/interactive' ? classes.active : ""}>
            <ListItemIcon><IconInteractive /></ListItemIcon>
            Интерактив
            </ListItem>
          </NavLink>}
          <NavLink to="/git" className={classes.link}>
            <ListItem button className={curPath === '/git' ? classes.active : ""}>
              <ListItemIcon><IconGitHub /></ListItemIcon>
              Про Git
            </ListItem>
          </NavLink>
          <NavLink to="/about" className={classes.link}>
            <ListItem button className={curPath === '/about' ? classes.active : ""}>
              <ListItemIcon><IconAbout /></ListItemIcon>
              О проекте
            </ListItem>
          </NavLink>
        </List>
        <Divider />
        {isAuth && role === 'admin' && <List>
          <ListItem button>
            <ListItemIcon><IconCommands /></ListItemIcon>
            Команды
          </ListItem>
          <ListItem button>
            <ListItemIcon><IconText /></ListItemIcon>
            Тексты
          </ListItem>
        </List>}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {routes}
      </main>
    </div>
  )
}
