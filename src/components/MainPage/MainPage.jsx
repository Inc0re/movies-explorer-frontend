import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Main from '../Main/Main'

function MainPage({ loggedIn }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <Main />
      <Footer />
    </>
  )
}

export default MainPage
