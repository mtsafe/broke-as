import * as React from 'react'
import { mount } from '@cypress/react'
import BtnLearnMore from './btn-learn-more.component'
import '../../assets/sketchy/bootstrap.min.css'

it('btn-learn-more', () => {
  mount(<BtnLearnMore />)
  cy.get('.lead')
})
