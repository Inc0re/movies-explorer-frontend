import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function FullPage({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default FullPage
