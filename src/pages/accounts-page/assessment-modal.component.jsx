import React from "react";

const AssessmentModal = ({ type }) => {
  return (
    <div id={type + "-assessment-modal"} className="modal fade">
      <div className="modal-dialog">
        <div id={type + "-modal-content"} className="modal-content">
          <div className="modal-header">
            <h1>Cash on Hand Comfort Levels</h1>
            <p>
              Select the ranges for cash on hand that are comfortable for you.
            </p>
          </div>
          <div id={type + "-modal-alert"}></div>
          <div id={type + "-modal-body"} className="modal-body">
            <div className="form-group">
              <label className="control-label text-success">
                Minimum "Okay" Level
              </label>
              <div className="form-group">
                <div className="input-group mb-3 text-success">
                  <div className="input-group-prepend">
                    <span className="input-group-text">$</span>
                  </div>
                  <input
                    id={type + "-modal-okay"}
                    type="number"
                    className="form-control"
                    aria-label="Amount (to the nearest dollar)"
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">.00</span>
                  </div>
                </div>
              </div>

              <label className="control-label text-warning">
                Minimum "Need Cash" Level
              </label>
              <div className="form-group">
                <div className="input-group mb-3 text-warning">
                  <div className="input-group-prepend">
                    <span className="input-group-text">$</span>
                  </div>
                  <input
                    id={type + "-modal-need"}
                    type="number"
                    className="form-control"
                    aria-label="Amount (to the nearest dollar)"
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">.00</span>
                  </div>
                </div>
              </div>

              <label className="control-label text-danger">
                Minimum "Serious" Level
              </label>
              <div className="form-group">
                <div className="input-group mb-3 text-danger">
                  <div className="input-group-prepend">
                    <span className="input-group-text">$</span>
                  </div>
                  <div>
                    <span className="input-group-text">
                      <canvas width="50" height="1"></canvas>0
                    </span>
                  </div>
                  <div className="input-group-append">
                    <span className="input-group-text">.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-default" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentModal;
