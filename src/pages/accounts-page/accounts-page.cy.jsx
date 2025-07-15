import * as React from 'react'
import { mount } from '@cypress/react'
import { BrowserRouter } from 'react-router-dom'
import AccountsPage from './accounts-page.component'
import '../../assets/sketchy/bootstrap.min.css'

it('accounts-page', () => {
  mount(
    <BrowserRouter>
      <AccountsPage />
    </BrowserRouter>,
  )
  cy.get('.jumbotron')
})
