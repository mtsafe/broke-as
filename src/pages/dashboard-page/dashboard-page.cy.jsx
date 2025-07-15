import * as React from 'react'
import { mount } from '@cypress/react'
import { BrowserRouter } from 'react-router-dom'
import DashboardPage from './dashboard-page.component'
import '../../assets/sketchy/bootstrap.min.css'

it('dashboard-page', () => {
  mount(
    <BrowserRouter>
      <DashboardPage />
    </BrowserRouter>,
  )
  cy.get('.jumbotron')
})
