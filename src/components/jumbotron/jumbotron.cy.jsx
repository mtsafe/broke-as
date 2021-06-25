import * as React from 'react'
import { mount } from '@cypress/react'
import Jumbotron from './jumbotron.component'
import '../../assets/sketchy/bootstrap.min.css'

it('Jumbotron', () => {
  mount(<Jumbotron>Foo</Jumbotron>)
  cy.get('.jumbotron')
})
