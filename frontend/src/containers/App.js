import React from 'react'
import { withRouter, Route } from 'react-router-dom'
import UserListPage from './UserListPage'
import UserPage from './UserPage'
import Switch from 'react-router-dom/Switch'
import { connect } from 'react-redux'
import PrivateRoute from '../components/PrivateRoute'
import { Container, Grid, Rail, Sticky, Segment, Checkbox, Menu, Button, Input, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PetPage from './PetPage'
import UserPetsListPage from './UserPetsListPage'

const App = props => {
  const { dispatch } = props
  return (
    <div>
      <Menu fixed='top' inverted size='large'>
        <Container>
          <Menu.Item name='home' onClick={this.handleItemClick} >
            <a style={{ color: 'white', fontSize: '20px' }} href='/pets'><Icon style={{ float: 'left' }} fitted color='green' size='large' name='paw' />
              <p style={{float: 'left', marginLeft: '10px', fontWeight: 'bold'}}>Pets</p>
            </a>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input className='icon' icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Item>
              <Button primary>Sign Up</Button>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
      <Grid columns='equal'>
        <Grid.Column witdh={4} >
          <Menu pointing vertical>
            <Menu.Item name='home' onClick={this.handleItemClick} active >
              <Link to='/users'>Home</Link>
            </Menu.Item>
            <Menu.Item name='messages' onClick={this.handleItemClick}>
              <Link to='/users'>Usuários</Link>
            </Menu.Item>
            <Menu.Item name='friends' onClick={this.handleItemClick}>
              <Link to='/pets'>Pets</Link>
            </Menu.Item>
          </Menu>
        </Grid.Column>
        <Grid.Column width={12}>
          <Switch>
            <PrivateRoute path='/users' component={UserListPage} />
            <PrivateRoute path='/pets' component={PetPage} />
            <PrivateRoute path='/user/:id/pets' component={UserPetsListPage} />
          </Switch>
        </Grid.Column>
      </Grid>
    </div >
  )
}

export default App
