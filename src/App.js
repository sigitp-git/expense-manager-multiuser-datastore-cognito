import React, { useState, useReducer, useEffect } from 'react'
import './styles/styles.scss'
import Context from './context/context'
import AppRouter from './router/AppRouter'
import filterReducer from './reducer/filter-reducer'
// AWS Amplify
import Amplify from '@aws-amplify/core'
import { DataStore } from '@aws-amplify/datastore'
import { Expense } from './models'
import awsConfig from './aws-exports'
import { AmplifyAuthenticator } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify'

Amplify.configure(awsConfig)

const App = () => {
  // Expenses state
  const [expenses, setExpenses] = useState([])
  const [username, setUsername] = useState('')
  const [isLoading, setIsloading] = useState(true)

  const fetchUserInfo = async () => {
    const userInfo = await Auth.currentUserInfo()
    setUsername(userInfo.username)
  }

  const fetchExpenses = async (usr) => {
    const expensesDS = await DataStore.query(Expense, (e) => e.owner('eq', usr))
    setExpenses(expensesDS)
  }

  // Fetch username from Cognito Auth class
  useEffect(() => {
    fetchUserInfo()
  }, [username])

  // Fetch expenses from DataStore only for the logged-in username, put into expenses state, all local transaction, offline support
  useEffect(() => {
    fetchExpenses(username).then(() => setIsloading(false))

    const subscription = DataStore.observe(Expense).subscribe(() =>
      fetchExpenses(username)
    )
    // Clean up effect when unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [expenses, username])

  // Filters state
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth()
  const firstDay = new Date(y, m, 1)
  const lastDay = new Date(y, m + 1, 0)

  const defFilters = {
    text: '',
    sortBy: 'date',
    startDate: firstDay,
    endDate: lastDay,
  }

  const [filters, dispatchFilters] = useReducer(filterReducer, defFilters)

  // Status state
  const [status, setStatus] = useState('Please add Expense below')

  // Return Context.Provider -> AppRouter Components (including DataStore object and Expense model)
  return (
    <Context.Provider
      value={{
        expenses,
        setExpenses,
        status,
        setStatus,
        filters,
        dispatchFilters,
        DataStore,
        Expense,
        Auth,
        isLoading,
      }}
    >
      <AmplifyAuthenticator>
        <AppRouter />
      </AmplifyAuthenticator>
    </Context.Provider>
  )
}

export default App
