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
      {/* <button onClick={() => props.showAll('My test text', 'success', 'top', 'center')}>Изменить текст</button>
      <button onClick={() => props.show('Special text', 'error')}>Изменить текст</button> */}
    </>
  )
}

function mapStateToProps(state) {
  return {
    text: state.text,
    typeText: state.typeText,
    vertical: state.vertical,
    horizontal: state.horizontal,
    open: state.open
  }
}

function mapDispatchToProps(dispatch) {
  return {
    show: (text, typeText) => dispatch({ type: 'SHOW', payload: { text, typeText } }),
    showAll: (text, typeText, vertical, horizontal) => dispatch({ type: 'SHOW', payload: { text, typeText, vertical, horizontal } }),
    hide: () => dispatch({ type: 'HIDE' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupMessage)