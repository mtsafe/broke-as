// import * as React from 'react'
import { mount } from "@cypress/react"
import "../../assets/sketchy/bootstrap.min.css"
import Impression from "./impression.component"

describe("Test Impression", () => {
  it("impression: default", () => {
    mount(
      Impression({
        id: "tragedy",
      })
    )
    cy.get("blockquote")
  })
  it("impression: comedy", () => {
    mount(
      Impression({
        id: "comedy",
      })
    )
    cy.get("blockquote")
  })
})
