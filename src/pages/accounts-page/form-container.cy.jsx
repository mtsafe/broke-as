import * as React from 'react'
import { mount } from '@cypress/react'
import { BrowserRouter } from 'react-router-dom'
import FormContainer from './form-container.component'
import '../../assets/sketchy/bootstrap.min.css'

it('form-container', () => {
  mount(
    <BrowserRouter>
      <FormContainer />
    </BrowserRouter>,
  )
  cy.get('.container')
})
