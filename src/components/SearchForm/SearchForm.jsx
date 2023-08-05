import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import './SearchForm.css'

function SearchForm({
  onSubmit,
  onTumblerSwitch,
  tumblerState,
  onSearchQueryChange,
  searchQuery,
  isSaved,
}) {
  return (
    <section className='search-form'>
      <form className='search-form__form' onSubmit={onSubmit}>
        <fieldset className='search-form__fieldset'>
          <input
            className='search-form__input'
            placeholder='Фильм'
            onChange={onSearchQueryChange}
            value={searchQuery}
            required
          />
          <button
            className='search-form__button'
            type='submit'
            disabled={searchQuery === ''}
          />
        </fieldset>
        <fieldset className='search-form__fieldset'>
          <FilterCheckbox
            id='short-film-switch'
            label='Короткометражки'
            onTumblerSwitch={onTumblerSwitch}
            tumblerState={tumblerState}
            isDisabled={isSaved ? false : searchQuery === ''}
          />
        </fieldset>
      </form>
    </section>
  )
}

export default SearchForm
