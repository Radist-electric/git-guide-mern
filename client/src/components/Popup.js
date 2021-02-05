import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import { connect } from 'react-redux'

export const PopupMessage = (props) => {
  const { vertical, horizontal } = props

  const handleClose = () => {
    props.hide()
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={props.open}
        autoHideDuration={3000}
        onClose={handleClose}
        key={new Date().getTime()}
      >
        <Alert severity={props.typeText}>
          {props.text}
        </Alert>
      </Snackbar>
    </>
  )
}

function mapStateToProps(state) {
  return {
    text: state.popup.text,
    typeText: state.popup.typeText,
    vertical: state.popup.vertical,
    horizontal: state.popup.horizontal,
    open: state.popup.open
  }
}

function mapDispatchToProps(dispatch) {
  return {
    hide: () => dispatch({ type: 'HIDE' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupMessage)