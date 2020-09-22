import React from "react";

import Selector from "../../components/selector/selector.component";
import SubmitBtnContainer from "../../components/submit-btn-container/submit-btn-container.component";

const FormContainer = ({ type }) => {
  return (
    <div id={type + "-form-container"} className="container">
      {/* <!-- Form Card --> */}
      <div className="card">
        <div className="card-content">
          <span className="card-title">Add New Money Location</span>
          <form action="" className="col">
            <div className="row">
              {/* <!-- Form Fields --> */}
              <div className="input-field col-sm-6">
                <input
                  type="text"
                  placeholder="Enter Location"
                  id={type + "-name"}
                />
                <label htmlFor="cash-name">Location</label>
              </div>
              <div className="input-field col-sm-6">
                $
                <input
                  type="number"
                  placeholder="Add Amount"
                  id={type + "-amount"}
                />
                <label htmlFor="cash-amount">Amount</label>
              </div>
              {/* <!-- Form Selector --> */}
              <footer id={type + "-form-footer"}>
                <div
                  id={type + "-location-selector"}
                  className="form-group float-left"
                >
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
                {/* <!-- Form Buttons --> */}
                <SubmitBtnContainer type="cash" />
                <button
                  id={type + "-back-btn"}
                  className="btn btn-outline-secondary float-right"
                >
                  <i className="fa fa-chevron-circle-left"></i> Back
                </button>
              </footer>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
