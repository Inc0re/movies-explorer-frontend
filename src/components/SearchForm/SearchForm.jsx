import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import './SearchForm.css'

function SearchForm() {
  return (
    <section className='search-form'>
      <form className='search-form__form'>
        <fieldset className='search-form__fieldset'>
          <input className='search-form__input' placeholder='Фильм' required />
          <button className='search-form__button' type='submit' />
        </fieldset>
        <fieldset className='search-form__fieldset'>
          <FilterCheckbox id='short-film-switch' label='Короткометражки' />
        </fieldset>
      </form>
    </section>
  )
}

export default SearchForm
