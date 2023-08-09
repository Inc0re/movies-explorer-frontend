import AuthForm from '../AuthForm/AuthForm'

function Register({ handleRegister, apiError, setApiError }) {
  const fields = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Имя',
      isRequired: true,
      minLength: 2,
      maxLength: 30,
      autocomplete: 'off',
      pattern: /^[\s\-A-Za-zА-Яа-яЁё]+$/,
      title: 'Имя может содержать только буквы, дефисы и пробелы',
    },
    {
      name: 'email',
      type: 'email',
      placeholder: 'E-mail',
      isRequired: true,
      minLength: 2,
      maxLength: 320,
      autocomplete: 'off',
      pattern: /^\S+@\S+\.\S+$/,
      title: 'Введите корректный email',
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Пароль',
      isRequired: true,
      minLength: 8,
      maxLength: 30,
      autocomplete: 'off',
    },
  ]

  return (
    <AuthForm
      title='Добро пожаловать!'
      btnText='Зарегистрироваться'
      onSubmit={handleRegister}
      type='register'
      fields={fields}
      requestError={apiError}
      setApiError={setApiError}
    />
  )
}

export default Register
