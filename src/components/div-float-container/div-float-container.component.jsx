import React from "react"
import "./div-float-container.styles.scss"

export const DivFloatContainer = ({ id, content }) => {
  return (
    <div id={id} className="div-float-container">
      {content}
    </div>
  )
}

export default DivFloatContainer
