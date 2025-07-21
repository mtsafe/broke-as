import * as React from "react"
import { mount } from "@cypress/react"
import { BrowserRouter } from "react-router-dom"
import "../../assets/sketchy/bootstrap.min.css"
import IntroPage from "./intro-page.component"

it("intro-page", () => {
  mount(
    <BrowserRouter>
      <IntroPage />
    </BrowserRouter>
  )
  cy.get("main")
})
