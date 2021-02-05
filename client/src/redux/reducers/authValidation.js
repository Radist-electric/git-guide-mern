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
      errorMessage: 'Минимальная длина пароля 8 символов и минимум 1 цифра',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 8
      }
    },
    nickName: {
      value: '',
      id: 'nickName',
      type: 'text',
      name: 'nickName',
      label: 'Введите ник',
      valid: true,
      touched: false,
    },
    firstName: {
      value: '',
      id: 'firstName',
      type: 'text',
      name: 'firstName',
      label: 'Введите имя',
      valid: true,
      touched: false,
    },
    lastName: {
      value: '',
      id: 'lastName',
      type: 'text',
      name: 'lastName',
      label: 'Введите фамилию',
      valid: true,
      touched: false,
    }
  }
}

export default function authValid(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_FORMCONTROLS':
      return {
        formControls: { ...action.payload.formControls },
        isFormValid: action.payload.isFormValid
      }
    case 'INIT_FORMCONTROLS':
      return {...initialState}
    default: return state
  }
}