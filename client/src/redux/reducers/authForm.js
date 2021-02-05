const initialState = {
  form: {
    email: '',
    password: '',
    nickName: '',
    firstName: '',
    lastName: '',
    role: 'user'
  }
}

export default function authForm(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_FORM':
      return {
        form: {...action.payload}
      }
    default: return state
  }
}