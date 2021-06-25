import * as React from 'react'
import { mount } from '@cypress/react'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './nav-bar.component'
import '../../assets/sketchy/bootstrap.min.css'

it('NavBar', () => {
  mount(
    <BrowserRouter>
      <NavBar currentPage="CT" />
    </BrowserRouter>,
  )
  cy.get('.navbar')
})
