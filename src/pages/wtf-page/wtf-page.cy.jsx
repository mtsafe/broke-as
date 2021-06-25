import * as React from 'react'
import { mount } from '@cypress/react'
import { BrowserRouter } from 'react-router-dom'
import WTFPage from './wtf-page.component'
import '../../assets/sketchy/bootstrap.min.css'

it('wtf-page', () => {
  mount(
    <BrowserRouter>
      <WTFPage />
    </BrowserRouter>,
  )
  cy.get('.jumbotron')
})
