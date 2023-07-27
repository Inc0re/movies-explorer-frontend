import { useNavigate } from 'react-router-dom'
import './Profile.css'

function Profile() {

  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }
  const user = {
    name: 'Виталий',
    email: 'test@ya.ru',
  }
  return (
    <div className='profile'>
      <h1 className='profile__title'>Привет, {user.name}!</h1>
      <form onSubmit={console.log('submit')} className='profile__form'>
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
          required
        />
        <div className='profile__split' />
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
          required
        />
      <div className='profile__buttons'>
        <button className='profile__button'>Редактировать</button>
        <button className='profile__button profile__button_red' onClick={handleLogout}>Выйти из аккаунта</button>
      </div>
      </form>
    </div>
  )
}

export default Profile
