import * as React from 'react'
import { mount } from '@cypress/react'
import { BrowserRouter } from 'react-router-dom'
import AccountsPage from './accounts-page.component'

it('accounts-page', () => {
  mount(
    <BrowserRouter>
      <AccountsPage></AccountsPage>
    </BrowserRouter>,
  )
  cy.get('.jumbotron')
})
