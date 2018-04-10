import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
// import DevTools from './DevTools'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import App from './App'
import LoginPage from './LoginPage'
import UserPage from './UserPage'
import { Menu } from 'semantic-ui-react'
import { Container } from 'semantic-ui-react'
import PrivateRoute from '../components/PrivateRoute'
import { ConnectedRouter } from 'react-router-redux'

const _showMenu = () => {
  return localStorage.getItem('userToken')
}

const Root = () => {
  return (
    <Router>
      <div>
        <Container style={{marginTop: '7em'}}>
          <Switch>
            <Route path='/login' component={LoginPage} />
            <Route path='/sign-up' component={UserPage} />
            <PrivateRoute path='/' component={App} />
          </Switch>
        </Container>
      </div>
    </Router>
  )
}

export default Root
