import React from 'react'
import { withRouter } from 'react-router-dom'
import PetForm from '../components/pet/PetForm'
import { Grid } from 'semantic-ui-react'

const PetPage = props => (
  <div className='addPetForm'>
    <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <PetForm {...props} />
      </Grid.Column>
    </Grid>
  </div>

)

export default withRouter(PetPage)
