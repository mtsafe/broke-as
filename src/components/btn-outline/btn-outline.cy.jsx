import * as React from 'react'
import { mount } from '@cypress/react'
import BtnOutline from './btn-outine.component'
import '../../assets/sketchy/bootstrap.min.css'

it('btn-outine', () => {
  mount(<BtnOutline />)
  cy.get('button')
})
