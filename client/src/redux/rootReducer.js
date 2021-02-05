import {combineReducers} from 'redux'

import popup from './reducers/popup'
import authForm from './reducers/authForm'
import authValid from './reducers/authValidation'

export default combineReducers({
  popup, authForm, authValid
})