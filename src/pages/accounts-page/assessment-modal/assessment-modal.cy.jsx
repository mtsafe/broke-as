import * as React from "react"
import { mount } from "@cypress/react"
import { BrowserRouter } from "react-router-dom"
import "../../../assets/sketchy/bootstrap.min.css"
import AssessmentModal from "./assessment-modal.component"

it("assessment-modal", () => {
  mount(
    <BrowserRouter>
      <AssessmentModal />
    </BrowserRouter>
  )
  cy.get(".modal-dialog")
})
