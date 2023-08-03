// TODO: fix form reset after submit
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import useFormAndValidation from '../../hooks/useFormAndValidation'
import './Profile.css'

function Profile({ onProfileUpdate, onLogout, requestError }) {
  const currentUser = useContext(CurrentUserContext)
  const { name, email } = currentUser
  const { values, setValues, handleChange, errors, isValid } =
    useFormAndValidation()

  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  const handleSubmit = e => {
    e.preventDefault()
    onProfileUpdate(values)
  }

  useEffect(() => {
    setValues({ name, email })
  }, [name, email, setValues])

  return (
    <main>
      <section className='profile'>
        <h1 className='profile__title'>Привет, {name}!</h1>
        <form className='profile__form'>
          <div className='profile__row'>
            <label className='profile__label' htmlFor='name'>
              Имя
            </label>
            <input
              className='profile__field'
              type='text'
              name='name'
              id='name'
              placeholder='Иван'
              value={values.name || ''}
              onChange={handleChange}
              minLength={2}
              maxLength={30}
              pattern='^[\s\-A-Za-zА-Яа-яЁё]+$'
              title='Имя может содержать только буквы, дефисы и пробелы'
              required
            />
            {errors.name && <p className='profile__error'>{errors.name}</p>}
          </div>
          <div className='profile__row'>
            <label className='profile__label' htmlFor='email'>
              E-mail
            </label>
            <input
              className='profile__field'
              type='email'
              name='email'
              id='email'
              placeholder='example@ya.ru'
              value={values.email || ''}
              onChange={handleChange}
              required
            />
            {errors.email && <p className='profile__error'>{errors.email}</p>}
          </div>
          <div className='profile__buttons'>
            <button
              className='profile__button'
              type='submit'
              disabled={
                !isValid || (name === values.name && email === values.email)
              }
              onClick={handleSubmit}
            >
              Редактировать
            </button>
            <button
              className='profile__button profile__button_red'
              type='button'
              onClick={handleLogout}
            >
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default Profile
