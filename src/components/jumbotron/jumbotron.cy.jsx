import * as React from "react"
import Jumbotron from "./jumbotron.component"
import "../../assets/sketchy/bootstrap.min.css"

describe("Test Jumbotrom", () => {
  it("Jumbotron: empty", () => {
    cy.mount(<Jumbotron />)
    cy.get(".jumbotron")
    cy.get(".jumbotron h1.display-3")
    cy.get(".jumbotron p.lead")
    cy.get(".jumbotron hr.style-2").should("not.exist")
    cy.get(".jumbotron p")
    cy.get(".jumbotron hr.my-4")
    cy.get(".jumbotron p.lead a")
  })

  it("Jumbotron: full data", () => {
    cy.mount(
      <Jumbotron
        title="Jumbotron Title"
        lead="This is the Jumbotron lead text."
        content="This is the Jumbotron content. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      />
    )
    cy.get(".jumbotron")
    cy.get(".jumbotron h1.display-3")
    cy.get(".jumbotron p.lead")
    cy.get(".jumbotron hr.style-2")
    cy.get(".jumbotron p")
    cy.get(".jumbotron hr.my-4")
    cy.get(".jumbotron p.lead a")
  })

  it("Jumbotron: no content", () => {
    cy.mount(
      <Jumbotron
        title="Jumbotron Title"
        lead="This is the Jumbotron lead text."
        content=""
      />
    )
    cy.get(".jumbotron")
    cy.get(".jumbotron h1.display-3")
    cy.get(".jumbotron p.lead")
    cy.get(".jumbotron hr.style-2").should("not.exist")
    cy.get(".jumbotron hr.my-4")
    cy.get(".jumbotron p.lead a")
  })
})
