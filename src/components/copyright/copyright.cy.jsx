import * as React from 'react'
import { mount } from '@cypress/react'
import Copyright from './copyright.component'
import '../../assets/sketchy/bootstrap.min.css'

it('copyright', () => {
  mount(<Copyright />)
  cy.get('span')
})
