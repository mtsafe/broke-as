import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders "We are sorry." span', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/"We are sorry."/i)
  expect(linkElement).toBeInTheDocument()
})
