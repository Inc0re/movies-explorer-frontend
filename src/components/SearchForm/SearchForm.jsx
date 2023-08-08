import React, { useEffect } from 'react'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import './SearchForm.css'

function SearchForm({
  onSubmit,
  onTumblerSwitch,
  onSearchQueryChange,
  onKeyDown,
  tumblerState,
  searchQuery,
  isSaved,
}) {
  // ставим обработчик сабмита формы при нажатии на enter и убираем при анмаунте
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <section className='search-form'>
      <form className='search-form__form' onSubmit={onSubmit}>
        <fieldset className='search-form__fieldset'>
          <input
            className='search-form__input'
            placeholder='Фильм'
            onChange={onSearchQueryChange}
            value={searchQuery}
            required={!isSaved}
          />
          <button
            className='search-form__button'
            type='submit'
            disabled={isSaved ? false : searchQuery === ''}
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
