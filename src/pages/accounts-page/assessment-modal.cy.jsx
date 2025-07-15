import * as React from 'react'
import { mount } from '@cypress/react'
import { BrowserRouter } from 'react-router-dom'
import AssessmentModal from './assessment-modal.component'
import '../../assets/sketchy/bootstrap.min.css'

it('assessment-modal', () => {
  mount(
    <BrowserRouter>
      <AssessmentModal />
    </BrowserRouter>,
  )
  cy.get('.modal-dialog')
})
