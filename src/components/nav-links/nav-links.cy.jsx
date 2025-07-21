import * as React from "react"
import { mount } from "@cypress/react"
import { MemoryRouter } from "react-router-dom"
import NavLinks from "./nav-links.component"
import "../../assets/sketchy/bootstrap.min.css"

it("nav-links", () => {
  const active = true
  const pages = [
    { key: 1, title: "Home", url: "/home" },
    { key: 2, title: "Dashboard", url: "/dashboard" },
    { key: 3, title: "Accounts", url: "/accounts" },
    { key: 4, title: "WTF", url: "/wtf" },
    { key: 5, title: "About", url: "/about" },
  ]
  mount(
    <MemoryRouter>
      <NavLinks pages={pages} active={active} />
    </MemoryRouter>
  )
  cy.get("ul")
})
