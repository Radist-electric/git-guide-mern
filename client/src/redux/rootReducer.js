import {combineReducers} from 'redux'

import popup from './reducers/popup'
import authForm from './reducers/authForm'

export default combineReducers({
  popup, authForm
})