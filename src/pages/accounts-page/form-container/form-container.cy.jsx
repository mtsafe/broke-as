import * as React from "react"
import { mount } from "@cypress/react"
import { BrowserRouter } from "react-router-dom"
import "../../../assets/sketchy/bootstrap.min.css"
import FormContainer from "./form-container.component"

it("form-container", () => {
  mount(
    <BrowserRouter>
      <FormContainer />
    </BrowserRouter>
  )
  cy.get(".container")
})
