import './FilterCheckbox.css'

function FilterCheckbox({ label, id, onTumblerSwitch, tumblerState, isDisabled }) {
  return (
    <div className='filter-checkbox'>
      <input
        className='filter-checkbox__input'
        type='checkbox'
        id={id}
        onChange={onTumblerSwitch}
        checked={tumblerState}
        disabled={isDisabled}
      />
      <label className='filter-checkbox__label' htmlFor={id} />
      <label className='filter-checkbox__text' htmlFor={id}>
        {label}
      </label>
    </div>
  )
}

export default FilterCheckbox
