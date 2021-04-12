import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

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
      <Typography variant="h2" component="h2">2020 &#169; Путеводитель по Git</Typography>
      <Typography variant="body1" component="p">Генерирует команды Git</Typography>
      </Container>
    </Box>
  )
}