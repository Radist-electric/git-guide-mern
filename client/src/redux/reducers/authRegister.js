const initialState = {
  register: false
}

export default function authRegister(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_REGISTER':
      return {register: action.payload.value}
    default: return state
  }
}