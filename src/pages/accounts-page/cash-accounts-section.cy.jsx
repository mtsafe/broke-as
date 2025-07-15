import * as React from 'react'
import { mount } from '@cypress/react'
import { BrowserRouter } from 'react-router-dom'
import CashAccountsSection from './cash-accounts-section.component'
import '../../assets/sketchy/bootstrap.min.css'

it('cash-accounts-section', () => {
  mount(
    <BrowserRouter>
      <CashAccountsSection />
    </BrowserRouter>,
  )
  cy.get('#cash-accounts')
})
