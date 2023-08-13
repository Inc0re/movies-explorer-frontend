import AuthForm from '../AuthForm/AuthForm'
import { EMAIL_REGEXP } from '../../utils/constants'


function Login({ handleLogin, apiError, setApiError, isWaitingRes }) {
  const fields = [
    {
      name: 'email',
      type: 'email',
      placeholder: 'E-mail',
      isRequired: true,
      minLength: 2,
      maxLength: 320,
      pattern: EMAIL_REGEXP,
      title: 'Введите корректный email',
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
      requestError={apiError}
      setApiError={setApiError}
      isWaitingRes={isWaitingRes}
    />
  )
}

export default Login
