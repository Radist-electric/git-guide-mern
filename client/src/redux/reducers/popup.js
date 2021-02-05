const initialState = {
  text: 'Приложение запущено',
  typeText: 'info',
  vertical: 'top',
  horizontal: 'center',
  open: true
}

export default function popup(state = initialState, action) {
  switch(action.type) {
    case 'SHOW':
      return {
        ...initialState, ...action.payload, open: true
      }
      case 'HIDE':
        return {
          ...state, text: null, open: false
        }
    default: return state
  }
}