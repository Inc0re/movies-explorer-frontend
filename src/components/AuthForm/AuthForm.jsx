import { Link } from 'react-router-dom'
import useForm from '../../hooks/useForm'
import './AuthForm.css'

function AuthForm({ title, btnText, onSubmit, type, fields, error }) {
  const { values, handleChange } = useForm({})

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(values)
  }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <div className='header__logo' />
      <h2 className='auth-form__title'>{title}</h2>
      {fields.map(field => (
        <>
          <label
            className='auth-form__label'
            key={field.name}
            htmlFor={field.name}
          >
            {field.placeholder}
          </label>
          <input
            className='auth-form__field'
            key={field.name}
            type={field.type}
            name={field.name}
            id={field.name}
            value={values[field.name] || ''}
            onChange={handleChange}
            required={field.isRequired}
            minLength={field.minLength}
            maxLength={field.maxLength}
          />
        </>
      ))}
      {error && <p className='auth-form__error'>{error}</p>}
      <button className='auth-form__btn' type='submit'>
        {btnText}
      </button>
      <div className='auth-form__redirect'>
        {type === 'register'
          ? 'Уже зарегистрированы?'
          : 'Ещё не зарегистрированы?'}
        &nbsp;
        <Link className='auth-form__link' to='/sign-in'>
          {type === 'register' ? 'Войти' : 'Регистрация'}
        </Link>
      </div>
    </form>
  )
}

export default AuthForm
