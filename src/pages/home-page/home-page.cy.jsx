import * as React from 'react'
import { mount } from '@cypress/react'
import { BrowserRouter } from 'react-router-dom'
import HomePage from './home-page.component'
import '../../assets/sketchy/bootstrap.min.css'

it('home-page', () => {
  mount(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>,
  )
  cy.get('.jumbotron')
})
