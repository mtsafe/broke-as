import React from "react"

import SubmitBtnContainer from "../../../../components/submit-btn-container/submit-btn-container.component"

const FormButtons = ({ type }) => {
  return (
    <>
      <SubmitBtnContainer type={type} />
      <button
        id={type + "-back-btn"}
        className="btn btn-outline-secondary float-right"
      >
        <i className="fa fa-chevron-circle-left"></i> Back
      </button>
    </>
  )
}

export default FormButtons
