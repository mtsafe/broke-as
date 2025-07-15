// import * as React from 'react'
import { mount } from '@cypress/react'
import Quotation from './quotation.component'
import '../../assets/sketchy/bootstrap.min.css'

it('quotation', () => {
  mount(
    Quotation({
      imgSrc: '../../assets/img/masks2.jpg',
      quote: 'Component Testing is for super Reactors.',
      author: 'React Dude',
      citation: 'React Proverbs',
    }),
  )
  cy.get('blockquote')
})
