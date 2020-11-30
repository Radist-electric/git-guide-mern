import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    zIndex: 1201,
    marginTop: 'auto',
    color: '#ffffff'
  }
}))

export const Footer = () => {
  const classes = useStyles()
  return (
    <Box className={classes.root} bgcolor="primary.main">
      <Container>
      <h4>2020 &#169; Путеводитель по Git</h4>
      <p>Генерирует команды Git</p>
      </Container>
    </Box>
  )
}