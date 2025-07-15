import * as React from 'react'
import { mount } from '@cypress/react'
import Selector from './selector.component'
import '../../assets/sketchy/bootstrap.min.css'

it('selector', () => {
  mount(
    <Selector
      id={'ct-select'}
      className="custom-select"
      defaultValue="Beer and Pizza"
      options={['Beer and Pizza', 'Soda and Sandwiches']}
    />,
  )
  cy.get('select')
})
