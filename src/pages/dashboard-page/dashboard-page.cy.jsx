import * as React from "react"
import { mount } from "@cypress/react"
import { BrowserRouter } from "react-router-dom"
import "../../assets/sketchy/bootstrap.min.css"
import DashboardPage from "./dashboard-page.component"

it("dashboard-page", () => {
  mount(
    <BrowserRouter>
      <DashboardPage />
    </BrowserRouter>
  )
  cy.get(".jumbotron")
})
