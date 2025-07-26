import * as React from "react"
import { mount } from "@cypress/react"
import { BrowserRouter } from "react-router-dom"
import "../../../../assets/sketchy/bootstrap.min.css"
import FormButtons from "./form-buttons.component"

it("form-buttons", () => {
  mount(
    <BrowserRouter>
      <FormButtons />
    </BrowserRouter>
  )
  cy.get(".fa-chevron-circle-left")
})
