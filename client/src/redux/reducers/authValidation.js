const initialState = {
  isFormValid: false,
  formControls: {
    email: {
      value: '',
      id: 'email',
      type: 'email',
      name: 'email',
      label: 'Введите email',
      errorMessage: 'Введите корректный email',
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true
      }
    },
    password: {
      value: '',
      id: 'password',
      type: 'password',
      name: 'password',
      label: 'Введите пароль',
      errorMessage: 'Введите корректный пароль',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6
      }
    },
    nickName: {
      value: '',
      id: 'nickName',
      type: 'text',
      name: 'nickName',
      label: 'Введите ник',
      valid: false,
      touched: false,
    },
    firstName: {
      value: '',
      id: 'firstName',
      type: 'text',
      name: 'firstName',
      label: 'Введите имя',
      valid: false,
      touched: false,
    },
    lastName: {
      value: '',
      id: 'lastName',
      type: 'text',
      name: 'lastName',
      label: 'Введите фамилию',
      valid: false,
      touched: false,
    }
  }
}

export default function authValid(state = initialState, action) {
  switch (action.type) {
    case 'VALID1':
      return {

      }
    case 'VALID2':
      return {

      }
    default: return state
  }
}