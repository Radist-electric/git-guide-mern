const initialState = {
  drawer: {
    open: false,
    anchorEl: null
  }
}

export default function miniDrawer(state = initialState, action) {
  switch (action.type) {
    case 'OPEN_DRAWER':
      return {
        drawer: {...state.drawer, open: true}
      }
    case 'CLOSE_DRAWER':
      return {
        drawer: {...state.drawer, open: false}
      }
    case 'OPEN_MENU':
      return {
        drawer: {...state.drawer, anchorEl: action.payload.event}
      }
    case 'CLOSE_MENU':
      return {
        drawer: {...state.drawer, anchorEl: null}
      }
    default: return state
  }
}