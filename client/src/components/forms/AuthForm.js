import { connect } from 'react-redux'
import is from 'is_js'
import TextField from '@material-ui/core/TextField'

export const AuthForm = (props) => {

  // Create a set of input fields from the received data
  const formInputs = () => {
    return Object.keys(props.formControls).map((controlName, index) => {
      const control = props.formControls[controlName]
      return (
        <TextField
          value={control.value}
          key={controlName + index}
          id={control.id}
          type={control.type}
          name={control.name}
          label={control.label}
          fullWidth={true}
          margin='normal'
          required={!!control.validation && control.validation.required}
          error={!control.valid && control.touched}
          helperText={!control.valid && control.touched && control.errorMessage}
          onKeyPress={props.pressHandler}
          onChange={event => onChangeHandler(event, controlName)}
        />
      )
    })
  }

  // Change data when user enters text
  const onChangeHandler = (event, controlName) => {
    const formControls = { ...props.formControls }
    const control = { ...formControls[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valid = validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })
    props.changeformControls(formControls, isFormValid)
    props.changeForm({ ...props.form, [event.target.name]: event.target.value })
  }

  // Inputs validation
  const validateControl = (value, validation) => {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  return (
    <>
      { formInputs()}
    </>
  )

}

function mapStateToProps(state) {
  return {
    form: state.authForm.form,
    formControls: state.authValid.formControls
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeForm: (form) => dispatch({ type: 'CHANGE_FORM', payload: form }),
    changeformControls: (formControls, isFormValid) => dispatch({ type: 'CHANGE_FORMCONTROLS', payload: { formControls, isFormValid } })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm)