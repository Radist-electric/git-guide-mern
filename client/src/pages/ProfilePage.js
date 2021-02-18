import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  bold: {
    fontWeight: 700
  }
}))

export const ProfilePage = () => {
  const classes = useStyles()
  const auth = useContext(AuthContext)
  const { userNickName, userFirstName, userLastName, role } = auth
  let abbr
  if (userFirstName && userLastName) {
    abbr = userFirstName[0].toUpperCase() + userLastName[0].toUpperCase()
  } else if (userNickName) {
    abbr = userNickName[0].toUpperCase()
  } else {
    abbr = null
  }

  return (
    <div>
      <h1>Личный кабинет</h1>
      <List dense={true}>
        <ListItem>
          <Avatar>{abbr}</Avatar>
        </ListItem>
        <ListItem>
          <span><span className={classes.bold}>Ваш ник: </span>{userNickName || 'Не задано'}</span>
        </ListItem>
        <ListItem>
          <span><span className={classes.bold}>Ваше имя: </span>{userFirstName || 'Не задано'}</span>
        </ListItem>
        <ListItem>
          <span><span className={classes.bold}>Ваша фамилия: </span>{userLastName || 'Не задано'}</span>
        </ListItem>
        <ListItem>
          <span><span className={classes.bold}>Ваша роль: </span>{role}</span>
        </ListItem>
      </List>
    </div>
  )
}