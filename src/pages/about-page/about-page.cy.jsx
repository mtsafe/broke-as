import * as React from "react"
import { mount } from "@cypress/react"
import { BrowserRouter } from "react-router-dom"
import "../../assets/sketchy/bootstrap.min.css"
import AboutPage from "./about-page.component"

it("about-page", () => {
  mount(
    <BrowserRouter>
      <AboutPage />
    </BrowserRouter>
  )
  cy.get(".jumbotron")
})
