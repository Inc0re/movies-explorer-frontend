import './FilterCheckbox.css'

function FilterCheckbox({ label, id }) {
  return (
    <>
      <input className='filter-checkbox__input' type='checkbox' id={id} />
      <label className='filter-checkbox__label' htmlFor={id}>
        {label}
      </label>
    </>
  )
}

export default FilterCheckbox
