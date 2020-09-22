import React from "react";

import "./accounts-page.styles.scss";
import masks2 from "../../assets/img/masks2.jpg";

import BtnLearnMore from "../../components/btn-learn-more/btn-learn-more.component";
import BtnOutline from "../../components/btn-outline/btn-outine.component";
import NavBar from "../../components/nav-bar/nav-bar.component";
import Quotation from "../../components/quotation/quotation.component";
import Selector from "../../components/selector/selector.component";

const AccountsPage = (props) => (
  <div id="AccountsPage">
    {/* <!-- NavBar --> */}
    <NavBar currentPage="Accounts" />
    {/* <!-- Header --> */}
    <header>
      <Quotation
        imgSrc={masks2}
        quote="It's a tragedy."
        author="William Shakespeare"
        citation="Once Upon A Time"
      />
    </header>
    {/* <!-- Main --> */}
    <main>
      <div id="jumbotron" className="jumbotron">
        <header>
          <h1 className="display-3">Cash Accounts</h1>
        </header>
        <hr className="style-2" />
        {/* <!-- Cash Accounts Section --> */}
        <section id="cash-accounts">
          <h2 className="white-text">Cash Accounts</h2>
          <div id="cash-form-container" className="container">
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
                        id="cash-name"
                      />
                      <label htmlFor="cash-name">Location</label>
                    </div>
                    <div className="input-field col-sm-6">
                      $
                      <input
                        type="number"
                        placeholder="Add Amount"
                        id="cash-amount"
                      />
                      <label htmlFor="cash-amount">Amount</label>
                    </div>
                    {/* <!-- Form Selector --> */}
                    <footer id="cash-form-footer">
                      <div
                        id="cash-location-selector"
                        className="form-group float-left"
                      >
                        <Selector
                          id="cash-location-select"
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
                      <div id="cash-submit-buttons" className="float-left">
                        <BtnOutline
                          id="cash-add-btn"
                          type="info"
                          faIcon="fa fa-plus"
                          label="Add Money Location"
                        />
                        <BtnOutline
                          id="cash-update-btn"
                          type="warning"
                          faIcon="fa fa-pencil-square-o"
                          label="Update Money"
                        />
                        <BtnOutline
                          id="cash-delete-btn"
                          type="danger"
                          faIcon="fa fa-remove"
                          label="Delete Money Location"
                        />
                      </div>
                      <button
                        id="cash-back-btn"
                        className="btn btn-outline-secondary float-right"
                      >
                        <i className="fa fa-chevron-circle-left"></i> Back
                      </button>
                    </footer>
                  </div>
                </form>
              </div>
            </div>
          </div>{" "}
          {/* <!-- End of cash-form-container --> */}
          <div id="cash-assessment-modal" className="modal fade">
            <div className="modal-dialog">
              <div id="cash-modal-content" className="modal-content">
                <div className="modal-header">
                  <h1>Cash on Hand Comfort Levels</h1>
                  <p>
                    Select the ranges for cash on hand that are comfortable for
                    you.
                  </p>
                </div>
                <div id="cash-modal-alert"></div>
                <div id="cash-modal-body" className="modal-body">
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
                          id="cash-modal-okay"
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
                          id="cash-modal-need"
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
          </div>{" "}
          {/* <!-- End of cash-assessment-modal --> */}
          <header id="cash-table-header">
            <span id="cash-form-instructions" className="lead">
              Where is your cash and liquids accounts such as checking accounts?
            </span>
            <h3 className="center-align float-right">
              Cash on Hand: $<span id="cash-total-amount">0.00</span>
            </h3>
            <button
              id="cash-badge"
              data-toggle="modal"
              data-target="#cash-assessment-modal"
              className="badge badge-pill badge-primary float-right"
            >
              <small>Set Warning Limits</small>
            </button>
          </header>
          <table id="cash-table" className="table table-hover">
            <thead>
              <tr>
                <th className="lead" scope="col">
                  Where
                </th>
                <th className="lead" scope="col">
                  Amount
                </th>
                <th className="lead" scope="col">
                  Recorded
                </th>
              </tr>
            </thead>
            <tbody id="cash-tbody"></tbody>
          </table>
          <footer id="cash-table-footer">
            <button
              id="cash-add-tr-btn"
              className="btn btn-outline-success float-left"
            >
              <i className="fa fa-plus"></i> Add a Money Row to Table
            </button>
            <button
              id="cash-clear-all-btn"
              type="button"
              className="btn btn-outline-danger float-right"
            >
              Purge Cash Accounts
            </button>
          </footer>
        </section>
        {/* <!-- End of Cash Accounts Section --> */}

        <hr className="style-2" />

        {/* <!-- Receivable Accounts Section --> */}
        <section id="recv-accounts">
          <h2 className="white-text">Receivables</h2>
          <div id="recv-form-container" className="container">
            {/* <!-- Form Card --> */}
            <div className="card">
              <div className="card-content">
                <span className="card-title">Add New Receivable</span>
                <form action="" className="col">
                  <div className="row">
                    {/* <!-- Form Fields --> */}
                    <div className="input-field col-sm-6">
                      <input
                        type="text"
                        placeholder="Enter Source"
                        id="recv-name"
                      />
                      <label htmlFor="recv-name">From</label>
                    </div>
                    <div className="input-field col-sm-6">
                      $
                      <input
                        type="number"
                        placeholder="Add Amount"
                        id="recv-amount"
                      />
                      <label htmlFor="recv-amount">Amount</label>
                    </div>
                    <div id="recv-location-selector" className="form-group">
                      <Selector
                        id="recv-location-select"
                        className="custom-select"
                        defaultValue="Or Select A Source"
                        options={["Or Select A Source", "Salary", "IOU"]}
                      />
                    </div>
                    <div className="input-field col-sm-6">
                      $
                      <input
                        type="date"
                        placeholder="Add Amount"
                        id="recv-next-date"
                      />
                      <label htmlFor="recv-next-date">Next Date</label>
                    </div>

                    {/* <!-- Form Selector --> */}
                    <footer id="recv-form-footer">
                      <div className="input-field col-sm-6 float-left">
                        <button
                          id="recv-frequency"
                          type="button"
                          className="btn btn-outline-primary"
                          data-toggle="modal"
                          data-target="#recv-recurrence-modal"
                        >
                          Click to set frequency
                        </button>
                      </div>
                      {/* <!-- Form Buttons --> */}
                      <div id="recv-submit-buttons" className="float-left">
                        <BtnOutline
                          id="recv-add-btn"
                          type="info"
                          faIcon="fa fa-plus"
                          label="Add Money Location"
                        />
                        <BtnOutline
                          id="recv-update-btn"
                          type="warning"
                          faIcon="fa fa-pencil-square-o"
                          label="Update Money"
                        />
                        <BtnOutline
                          id="recv-delete-btn"
                          type="danger"
                          faIcon="fa fa-remove"
                          label="Delete Money Location"
                        />
                      </div>
                      <button
                        id="recv-back-btn"
                        className="btn btn-outline-secondary float-right"
                      >
                        <i className="fa fa-chevron-circle-left"></i> Back
                      </button>
                    </footer>
                  </div>
                </form>
              </div>
            </div>
          </div>{" "}
          {/* <!-- End of recv-form-container --> */}
          <div id="recv-recurrence-modal" className="modal fade">
            <div className="modal-dialog">
              <div id="recv-recur-modal-content" className="modal-content">
                <div className="modal-header">
                  <h1>Receivable Income Recurrence</h1>
                  <p>Select the frequency of this income.</p>
                </div>
                <div id="recv-recur-modal-alert"></div>

                <div id="recv-recur-modal-body" className="modal-body">
                  <div className="form-group">
                    <label htmlFor="recv-recur-every">Repeat every: </label>
                    <Selector
                      id="recv-recur-every"
                      className="form-control ib-40"
                      defaultValue="1"
                      options={[
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "10",
                        "11",
                      ]}
                    />
                    <label htmlFor="recv-recur-time"></label>
                    <Selector
                      id="recv-recur-time"
                      className="form-control ib-70"
                      defaultValue=""
                      options={["day", "week", "month", "year"]}
                    />
                  </div>
                  <div id="recur-weekday-container">
                    <div className="row">
                      <div id="recur-weekdays" className="form-group">
                        <span id="recur-weekday-header">Repeating on:</span>
                        <button
                          id="recur-mo"
                          className="badge badge-pill badge-success"
                        >
                          Mo
                        </button>
                        <button
                          id="recur-tu"
                          className="badge badge-pill badge-light"
                        >
                          Tu
                        </button>
                        <button
                          id="recur-we"
                          className="badge badge-pill badge-light"
                        >
                          We
                        </button>
                        <button
                          id="recur-th"
                          className="badge badge-pill badge-light"
                        >
                          Th
                        </button>
                        <button
                          id="recur-fr"
                          className="badge badge-pill badge-light"
                        >
                          Fr
                        </button>
                        <button
                          id="recur-sa"
                          className="badge badge-pill badge-light"
                        >
                          Sa
                        </button>
                        <button
                          id="recur-su"
                          className="badge badge-pill badge-light"
                        >
                          Su
                        </button>
                      </div>
                    </div>
                  </div>
                  <div id="recur-end-container">
                    <div id="recur-end-header">Ending:</div>
                    <div id="recur-end-grid" className="form-group">
                      <div className="row">
                        <div
                          id="recur-end-never"
                          className="custom-control custom-radio grid-l col-sm-3"
                        >
                          <input
                            type="radio"
                            id="customRadio1"
                            name="endingRadio"
                            className="custom-control-input"
                            defaultChecked=""
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customRadio1"
                          >
                            Never
                          </label>
                        </div>
                      </div>
                      <div className="row">
                        <div
                          id="recur-end-on"
                          className="custom-control custom-radio grid-l col-sm-3"
                        >
                          <input
                            type="radio"
                            id="customRadio2"
                            name="endingRadio"
                            className="custom-control-input"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customRadio2"
                          >
                            On --&gt;
                          </label>
                        </div>
                        <div id="recur-end-date" className="grid-r col-sm-5">
                          <label
                            className="col-form-label col-form-label-sm"
                            htmlFor="recur-end-date-input"
                          ></label>
                          <input
                            id="recur-end-date-input"
                            className=""
                            type="date"
                            placeholder="mm/dd/yyyy"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div
                          id="recur-end-after"
                          className="custom-control custom-radio grid-l col-sm-3"
                        >
                          <input
                            type="radio"
                            id="customRadio3"
                            name="endingRadio"
                            className="custom-control-input"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customRadio3"
                          >
                            After --&gt;
                          </label>
                        </div>

                        <div
                          id="recur-end-occurances"
                          className="grid-r col-sm-5"
                        >
                          <label htmlFor="recv-recur-occurances"></label>
                          <Selector
                            id="recv-recur-occurances"
                            className="form-control ib-40"
                            defaultValue="1"
                            options={[
                              "1",
                              "2",
                              "3",
                              "4",
                              "5",
                              "6",
                              "7",
                              "8",
                              "9",
                              "10",
                              "11",
                            ]}
                          />
                          occurances
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
          </div>{" "}
          {/* <!-- End of recv-recurrence-modal --> */}
          <div id="recv-assessment-modal" className="modal fade">
            <div className="modal-dialog">
              <div id="recv-modal-content" className="modal-content">
                <div className="modal-header">
                  <h1>Cash on Hand Comfort Levels</h1>
                  <p>
                    Select the ranges for cash on hand that are comfortable for
                    you.
                  </p>
                </div>
                <div id="recv-modal-alert"></div>
                <div id="recv-modal-body" className="modal-body">
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
                          id="recv-modal-okay"
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
                          id="recv-modal-need"
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
          </div>{" "}
          {/* <!-- End of recv-assessment-modal --> */}
          <header id="recv-table-header">
            <span id="recv-form-instructions" className="lead">
              What money do you have coming?
            </span>
            <h3 className="center-align float-right">
              Cash Incoming (4 wk): $<span id="recv-total-amount">0.00</span>
            </h3>
            <button
              id="recv-badge"
              data-toggle="modal"
              data-target="#recv-assessment-modal"
              className="badge badge-pill badge-primary float-right"
            >
              <small>Set Warning Limits</small>
            </button>
          </header>
          <table id="recv-table" className="table table-hover">
            <thead>
              <tr>
                <th className="lead" scope="col">
                  From
                </th>
                <th className="lead" scope="col">
                  Amount
                </th>
                <th className="lead" scope="col">
                  When
                </th>
                <th className="lead" scope="col">
                  Frequency
                </th>
                <th className="lead" scope="col">
                  Ending
                </th>
                <th className="lead" scope="col">
                  Recorded
                </th>
              </tr>
            </thead>
            <tbody id="recv-tbody"></tbody>
          </table>
          <footer id="recv-table-footer">
            <button
              id="recv-add-tr-btn"
              className="btn btn-outline-success float-left"
            >
              <i className="fa fa-plus"></i> Add a Receivable Row to Table
            </button>
            <button
              id="recv-clear-all-btn"
              type="button"
              className="btn btn-outline-danger float-right"
            >
              Purge Receivable Accounts
            </button>
          </footer>
        </section>
        {/* <!-- End of Receivable Accounts Section --> */}

        <hr className="style-2" />

        <footer id="jumbotron-footer">
          <BtnLearnMore />
        </footer>
      </div>{" "}
      {/* <!-- End of jumbotron --> */}
    </main>
    <script type="module" src="./src/main.mjs"></script>
  </div>
);

export default AccountsPage;
