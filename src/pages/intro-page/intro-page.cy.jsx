import * as React from 'react'
import { mount } from '@cypress/react'
import { BrowserRouter } from 'react-router-dom'
import IntroPage from './intro-page.component'
import '../../assets/sketchy/bootstrap.min.css'

it('intro-page', () => {
  mount(
    <BrowserRouter>
      <IntroPage />
    </BrowserRouter>,
  )
  cy.get('main')
})
