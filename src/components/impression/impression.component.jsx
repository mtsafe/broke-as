import React from "react"
import Quotation from "../quotation/quotation.component"

import "./impression.styles.scss"
import masks2 from "../../assets/img/masks2.jpg"

function Impression({ id }) {
  let imgSrc = masks2
  let imgAlt = "Laughing/crying theater masks"
  let quote = "It's a tragedy."
  let author = "William Shakespeare"
  let source = "Once Upon A Time"

  if (id === "comedy") {
    quote = "It's a comedy."
  }

  return (
    <Quotation
      id={id}
      imgSrc={imgSrc}
      imgAlt={imgAlt}
      quote={quote}
      author={author}
      source={source}
    />
  )
}

export default Impression
