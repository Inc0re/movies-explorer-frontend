/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useFormAndValidation from '../../hooks/useFormAndValidation'
import './AuthForm.css'

function AuthForm({
  title,
  btnText,
  onSubmit,
  type,
  fields,
  requestError,
  setApiError,
}) {
  const params =
    type === 'register'
      ? {
          text: 'Уже зарегистрированы?',
          linkText: 'Войти',
          linkTo: '/signin',
        }
      : {
          text: 'Ещё не зарегистрированы?',
          linkText: 'Регистрация',
          linkTo: '/signup',
        }
  const { values, handleChange, errors, isValid } = useFormAndValidation()

  useEffect(() => {
    setApiError('')
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(values)
  }

  return (
    <main>
      <section>
        <form className='auth-form' onSubmit={handleSubmit}>
          <Link to='/' className='auth-form__logo' />
          <h1 className='auth-form__title'>{title}</h1>
          {fields.map(field => (
            <Fragment key={field.name}>
              <label className='auth-form__label' htmlFor={field.name}>
                {field.placeholder}
              </label>
              <input
                className='auth-form__field'
                type={field.type}
                name={field.name}
                id={field.name}
                value={values[field.name] || ''}
                onChange={handleChange}
                required={field.isRequired}
                minLength={field.minLength}
                maxLength={field.maxLength}
                autoComplete={field.autoComplete}
                pattern={field.pattern && field.pattern.source}
                title={field.title}
              />
              {errors[field.name] && (
                <p className='auth-form__error'>{errors[field.name]}</p>
              )}
            </Fragment>
          ))}
          {requestError && <p className='auth-form__error'>{requestError}</p>}
          <button
            className={
              'auth-form__btn' +
              (type === 'login' ? ' auth-form__btn_margin_xl' : '')
            }
            type='submit'
            disabled={!isValid}
          >
            {btnText}
          </button>
          <div className='auth-form__redirect'>
            {params.text}
            &nbsp;
            <Link className='auth-form__link' to={params.linkTo}>
              {params.linkText}
            </Link>
          </div>
        </form>
      </section>
    </main>
  )
}

export default AuthForm
