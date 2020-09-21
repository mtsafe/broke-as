import React from "react";

function Quotation({ imgSrc, quote, author, citation }) {
  return (
    <blockquote className="blockquote">
      <img
        id="header-image"
        className="tight"
        src={imgSrc}
        alt="Laughing/crying theater masks"
      />{" "}
      <div id="header-text" className="tight">
        <p className="mb-0">&quot;{quote}&quot;</p>
        <footer className="blockquote-footer">
          {author}, <cite title="Source Title">{citation}</cite>
        </footer>
      </div>
    </blockquote>
  );
}

export default Quotation;
