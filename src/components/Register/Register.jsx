import AuthForm from '../AuthForm/AuthForm'
import './Register.css'

function Register({ handleRegister }) {
  const fields = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Имя',
      isRequired: true,
      minLength: 2,
      maxLength: 30,
    },
    {
      name: 'email',
      type: 'email',
      placeholder: 'E-mail',
      isRequired: true,
      minLength: 2,
      maxLength: 320,
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Пароль',
      isRequired: true,
      minLength: 8,
      maxLength: 30,
    },
  ]
  return (
    <AuthForm
      title='Добро пожаловать!'
      btnText='Зарегистрироваться'
      onSubmit={handleRegister}
      type='register'
      fields={fields}
      error='Что-то пошло не так...'
    />
  )
}

export default Register
