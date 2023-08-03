import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Movies from '../Movies/Movies'

function MoviesPage({ loggedIn, isSaved }) {
  return (
    <>
      <Header loggedIn={loggedIn}/>
      <Movies isSaved={isSaved} />
      <Footer />
    </>
  )
}

export default MoviesPage
