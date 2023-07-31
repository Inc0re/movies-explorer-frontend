import AuthForm from '../AuthForm/AuthForm'

function Login({ handleLogin }) {
  const fields = [
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
      title='Рады видеть!'
      btnText='Войти'
      onSubmit={handleLogin}
      type='login'
      fields={fields}
      error='Что-то пошло не так...'
    />
  )
}

export default Login
