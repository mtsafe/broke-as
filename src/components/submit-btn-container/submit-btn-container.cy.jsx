import * as React from 'react'
import { mount } from '@cypress/react'
import SubmitBtnContainer from './submit-btn-container.component'
import '../../assets/sketchy/bootstrap.min.css'

it('submit-btn-container', () => {
  mount(<SubmitBtnContainer />)
  cy.get('div')
})
