/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
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
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!searchQuery && !isSaved) {
      setError('Нужно ввести ключевое слово')
    } else {
      setError('')
      onSubmit(e)
    }
  }

  // ставим обработчик сабмита формы при нажатии на enter и убираем при анмаунте
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  useEffect(() => {
    setError('')
  }, [isSaved])

  return (
    <section className='search-form'>
      <form className='search-form__form' onSubmit={handleSubmit} noValidate>
        <fieldset className='search-form__fieldset'>
          <input
            className='search-form__input'
            placeholder='Фильм'
            onChange={onSearchQueryChange}
            value={searchQuery}
            required={!isSaved}
            title='Нужно ввести ключевое слово'
          />
          <button
            className='search-form__button'
            type='submit'
            // disabled={isSaved ? false : searchQuery === ''}
          />
        </fieldset>
        {error && <p className='search-form__error'>{error}</p>}
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
