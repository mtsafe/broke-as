import * as React from "react"
import { mount } from "@cypress/react"
import { MemoryRouter } from "react-router-dom"
import "../../../assets/sketchy/bootstrap.min.css"
import CashAccountsSection from "./cash-accounts-section.component"

it("cash-accounts-section", () => {
  mount(
    <MemoryRouter>
      <CashAccountsSection />
    </MemoryRouter>
  )
  cy.get("#cash-accounts")
})
