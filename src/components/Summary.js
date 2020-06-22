import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Context from '../context/context'
import numeral from 'numeral'

const Summary = () => {
  const { expenses, isLoading, username } = useContext(Context)
  const totalAmount = expenses.reduce((acc, cur) => {
    return (acc = acc + cur.amount)
  }, 0)

  return (
    <div className='page-header'>
      <div className='content-container'>
        {isLoading ? (
          <h1 className='page-header__title'>Loading...</h1>
        ) : (
          <h1 className='page-header__title'>
            Hello <span>{username}</span>, there are{' '}
            <span>{expenses.length}</span> expenses recorded, total:{' '}
            <span>{numeral(totalAmount / 100).format('$0,0.00')}</span>
          </h1>
        )}
        <div className='page-header__actions'>
          <Link className='button button--dark' to='/add'>
            Add Expense
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Summary
