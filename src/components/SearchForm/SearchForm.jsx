import React, { useEffect } from 'react'
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
  // ставим обработчик сабмита формы при нажатии на enter и убираем при анмаунте
  useEffect(() => {
    const formField = document.querySelector('.search-form__input')
    const handleEnter = e => {
      if (
        e.key === 'Enter' &&
        (searchQuery !== '' || isSaved) &&
        formField === document.activeElement
      ) {
        onSubmit()
      }
    }
    document.addEventListener('keydown', handleEnter)
    return () => {
      document.removeEventListener('keydown', handleEnter)
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
