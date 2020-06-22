import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import Loading from './components/Loading'
// AWS Amplify
import Amplify from '@aws-amplify/core'
import { DataStore } from '@aws-amplify/datastore'
import { Expense } from './models'
import awsConfig from './aws-exports'
import { Auth } from 'aws-amplify'

Amplify.configure(awsConfig)

const fetchUserInfo = async () => {
  const user = await Auth.currentUserInfo()
  const userName = user.username
  return userName
}

const fetchExpenses = async (usr) => {
  const expensesDS = await DataStore.query(Expense, (e) => e.owner('eq', usr))
  return expensesDS
}

ReactDOM.render(<Loading />, document.getElementById('root'))

let hasRendered = false
const renderApp = (exps) => {
  if (!hasRendered) {
    ReactDOM.render(
      <React.StrictMode>
        <App expenses={exps} />
      </React.StrictMode>,
      document.getElementById('root')
    )
    hasRendered = true
  }
}

fetchUserInfo()
  .then((userName) => fetchExpenses(userName))
  .then((expensesDS) => renderApp(expensesDS))

//setTimeout(() => renderApp(), 500)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
