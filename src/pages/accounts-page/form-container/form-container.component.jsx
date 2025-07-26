import React from "react"

import Selector from "../../../components/selector/selector.component"
import FormButtons from "./form-buttons/form-buttons.component"
import DivFloatContainer from "../../../components/div-float-container/div-float-container.component"

const formInputFields = type => {
  return (
    <>
      <div className="input-field col-sm-6">
        <input type="text" placeholder="Enter Location" id={type + "-name"} />
        <label htmlFor={type + "-name"}>Location</label>
      </div>
      <div className="input-field col-sm-6">
        $
        <input type="number" placeholder="Add Amount" id={type + "-amount"} />
        <label htmlFor={type + "-amount"}>Amount</label>
      </div>
    </>
  )
}

const formLowerHalfContent = type => {
  return (
    <>
      <div id={type + "-location-selector"} className="form-group float-left">
        <Selector
          id={type + "-location-select"}
          className="custom-select"
          defaultValue="Or Select A Location"
          options={[
            "Or Select A Location",
            "Wallet",
            "Pocket",
            "Stash Box",
            "Sock Drawer",
            "Mattress",
            "Checking Acct",
          ]}
        />
      </div>
      <FormButtons type={type} />
    </>
  )
}

const FormContainer = ({ type }) => {
  return (
    <div id={type + "-form-container"} className="container">
      {/* <!-- Form Card --> */}
      <div className="card">
        <div className="card-content">
          <span className="card-title">Add New Money Location</span>
          <form action="" className="col">
            <div className="row">
              <DivFloatContainer
                id={type + "-form-input-fields"}
                content={formInputFields(type)}
              />
              <DivFloatContainer
                id={type + "-form-lower-half"}
                content={formLowerHalfContent(type)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FormContainer
