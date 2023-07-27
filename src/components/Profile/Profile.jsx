import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Profile.css'

function Profile() {
  const [user, setUser] = useState({
    name: 'Виталий',
    email: 'test@ya.ru',
  })

  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  const handleChange = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  return (
    <main>
      <section className='profile'>
        <h1 className='profile__title'>Привет, {user.name}!</h1>
        <form onSubmit={console.log('submit')} className='profile__form'>
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
              value={user.name}
              onChange={handleChange}
              minLength={2}
              maxLength={30}
              required
            />
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
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='profile__buttons'>
            <button className='profile__button' type='submit'>
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
