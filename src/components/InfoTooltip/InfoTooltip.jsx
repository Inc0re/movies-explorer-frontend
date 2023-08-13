import okImage from '../../images/popup/status-ok.svg'
import errorImage from '../../images/popup/status-error.svg'
import Popup from '../Popup/Popup'

function InfoTooltip({ isSuccess, isOpened, setIsPopupOpened, message }) {
  function handleClose() {
    setIsPopupOpened(false)
  }

  return (
    <Popup name={'info'} isOpen={isOpened} onClose={handleClose}>
      {isSuccess ? (
        <div
          className='popup__warning-image'
          style={{ backgroundImage: `url(${okImage})` }}
        />
      ) : (
        <div
          className='popup__warning-image'
          style={{ backgroundImage: `url(${errorImage})` }}
        />
      )}
      <h2 className='popup__warning'>
        {isSuccess
          ? message || 'Успешно!'
          : message || 'Что-то пошло не так!'}
      </h2>
    </Popup>
  )
}

export default InfoTooltip
