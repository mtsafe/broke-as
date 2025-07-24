import React from "react"
import "./quotation.styles.scss"

export const Quotation = ({ id, imgSrc, imgAlt, quote, author, source }) => {
  let imgId = id + "-quotation-image"
  let divId = id + "-quotation-text"
  return (
    <blockquote id={id} className="quotation">
      <img id={imgId} className="quotation-image" src={imgSrc} alt={imgAlt} />{" "}
      <div id={divId} className="quotation-text">
        <p className="mb-0">&quot;{quote}&quot;</p>
        <footer className="blockquote-footer">
          {author}, <cite title="Source Title">{source}</cite>
        </footer>
      </div>
    </blockquote>
  )
}

export default Quotation
