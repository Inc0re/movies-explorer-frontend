import Header from '../Header/Header'
import Profile from '../Profile/Profile'

function ProfilePage({ loggedIn }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <Profile />
    </>
  )
}

export default ProfilePage
