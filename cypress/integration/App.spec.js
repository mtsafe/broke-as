import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { mount } from '@cypress/react'

// Bootstrap 4.5.2 : Bootswatch : Sketchy
// import '../../src/assets/sketchy/bootstrap.min.css'
// import '../../src/assets/index.scss'

import App from '../../src/App'

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root'),
// )

it('renders learn react link', () => {
  mount(
    // ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
  )
  // <App />)
  cy.get('a').contains('Learn React')
})
