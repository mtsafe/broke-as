import * as React from "react"
import Jumbotron from "./jumbotron.component"
import "../../assets/sketchy/bootstrap.min.css"

describe("Test Jumbotrom", () => {
  it("Jumbotron mounts", () => {
    cy.mount(<Jumbotron />)
    cy.get(".jumbotron")
  })
  it("Jumbotron 2 mounts: full data", () => {
    cy.mount(
      <Jumbotron
        title="Jumbotron Title"
        lead="This is the Jumbotron lead text."
        content="This is the Jumbotron content."
      />
    )
    cy.get(".jumbotron")
    cy.get(".jumbotron h1.display-3")
    cy.get(".jumbotron p.lead")
    cy.get(".jumbotron hr.my-4")
    cy.get(".jumbotron p")
    cy.get(".jumbotron p.lead a")
  })
  it("Jumbotron 3 mounts: no content", () => {
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
    cy.get(".jumbotron hr.my-4").should("not.exist")
    cy.get(".jumbotron p.lead a")
  })
})
