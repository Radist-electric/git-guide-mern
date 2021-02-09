import {combineReducers} from 'redux'

import popup from './reducers/popup'
import authForm from './reducers/authForm'
import authValid from './reducers/authValidation'
import authRegister from './reducers/authRegister'
import miniDrawer from './reducers/miniDrawer'

export default combineReducers({
  popup, authForm, authRegister, authValid, miniDrawer
})