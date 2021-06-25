import * as React from 'react'
import { mount } from '@cypress/react'
import Table from './table.component'
import '../../assets/sketchy/bootstrap.min.css'

it('table', () => {
  mount(
    <Table type={'ct'} headings={('cash', ['Where', 'Amount', 'Recorded'])} />,
  )
  cy.get('table')
})
