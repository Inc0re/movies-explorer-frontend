import AuthForm from '../AuthForm/AuthForm'

function Register({ handleRegister }) {
  const fields = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Имя',
      isRequired: true,
      minLength: 2,
      maxLength: 30,
      autocomplete: 'off',
      pattern: /^[A-Za-zА-Яа-яЁё\s-]+$/,
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

  function handleRegister(data) {
    console.log(data)
  }

  return (
    <AuthForm
      title='Добро пожаловать!'
      btnText='Зарегистрироваться'
      // onSubmit={handleRegister}
      type='register'
      fields={fields}
    />
  )
}

export default Register
