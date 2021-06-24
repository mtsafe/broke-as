import * as React from 'react'
import { mount } from '@cypress/react'
import Jumbotron from './jumbotron.component'

it('Jumbotron', () => {
  mount(<Jumbotron>Foo</Jumbotron>)
  cy.get('.jumbotron')
})
