import Header from '../Header/Header'
import Profile from '../Profile/Profile'

function ProfilePage({ loggedIn, ...props }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <Profile {...props}/>
    </>
  )
}

export default ProfilePage
