import * as React from "react"
import { mount } from "@cypress/react"
import "../../assets/sketchy/bootstrap.min.css"
import DivFloatContainer from "./div-float-container.component"
import masks2 from "../../assets/img/masks2.jpg"

describe("Test DivFloatContainer", () => {
  it("quotation", () => {
    mount(
      DivFloatContainer({
        id: "Test DivFloatContainer",
        content: <img id={"testImgId"} className="test-image" src={masks2} />,
      })
    )
    cy.get("img")
  })
})
