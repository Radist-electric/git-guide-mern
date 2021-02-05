const initialState = {
  popup: {
    text: 'Приложение запущено',
    typeText: 'info',
    vertical: 'top',
    horizontal: 'center',
    open: true
  }
}

export default function popup(state = initialState, action) {
  switch (action.type) {
    case 'SHOW':
      return {
        popup: {
          ...initialState, ...action.payload, open: true
        }
      }
    case 'HIDE':
      return {
        popup: {...state.popup, text: null, open: false}
      }
    default: return state
  }
}