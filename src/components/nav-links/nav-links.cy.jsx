import * as React from 'react'
import { mount } from '@cypress/react'
import { BrowserRouter } from 'react-router-dom'
import NavLinks from './nav-links.component'
import '../../assets/sketchy/bootstrap.min.css'

it('nav-links', () => {
  const active = true
  const pages = [
    { key: 1, title: 'Home', url: '/home' },
    { key: 2, title: 'Dashboard', url: '/dashboard' },
    { key: 3, title: 'Accounts', url: '/accounts' },
    { key: 4, title: 'WTF', url: '/wtf' },
    { key: 5, title: 'About', url: '/about' },
  ]
  mount(
    <BrowserRouter>
      <NavLinks pages={pages} active={active} />
    </BrowserRouter>,
  )
  cy.get('ul')
})
