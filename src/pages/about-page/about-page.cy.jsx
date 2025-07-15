import * as React from 'react'
import { mount } from '@cypress/react'
import { BrowserRouter } from 'react-router-dom'
import AboutPage from './about-page.component'
import '../../assets/sketchy/bootstrap.min.css'

it('about-page', () => {
  mount(
    <BrowserRouter>
      <AboutPage />
    </BrowserRouter>,
  )
  cy.get('.jumbotron')
})
