import './Pagination.css'

function Pagination({ onLoadMore }) {
  return (
    <div className='pagination'>
      <button className='pagination__button' type='button' onClick={onLoadMore}>
        Ещё
      </button>
    </div>
  )
}

export default Pagination
