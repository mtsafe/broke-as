import * as React from "react"
import { mount } from "@cypress/react"
import { BrowserRouter } from "react-router-dom"
import "../../assets/sketchy/bootstrap.min.css"
import AccountsPage from "./accounts-page.component"

it("accounts-page", () => {
  mount(
    <BrowserRouter>
      <AccountsPage />
    </BrowserRouter>
  )
  cy.get(".jumbotron")
})
