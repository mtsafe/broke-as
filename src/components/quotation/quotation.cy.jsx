// import * as React from 'react'
import { mount } from "@cypress/react"
import "../../assets/sketchy/bootstrap.min.css"
import Quotation from "./quotation.component"
import masks2 from "../../assets/img/masks2.jpg"

describe("Test Quotation", () => {
  it("quotation", () => {
    mount(
      Quotation({
        imgSrc: masks2,
        imgAlt: "Laughing/crying theater masks",
        quote: "Component Testing is for super Reactors.",
        author: "React Dude",
        source: "React Proverbs",
      })
    )
    cy.get("blockquote")
    cy.get("blockquote img")
  })

  // it("quotation within BrowserRouter", () => {
  //   mount(
  //     <BrowserRouter>
  //       <Quotation />
  //     </BrowserRouter>
  //   )
  //   cy.get("blockquote")
  // })
})
