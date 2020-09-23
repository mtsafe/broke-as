import React from "react";

import "./cash-accounts-section.styles.scss";

import AssessmentModal from "./assessment-modal.component";
import FormContainer from "./form-container.component";
import Table from "../../components/table/table.component";

const CashAccountsSection = (props) => (
  <section id="cash-accounts">
    {/* <!-- Cash Accounts Section --> */}
    <h2 className="white-text">Cash Accounts</h2>
    <FormContainer type="cash" />
    <AssessmentModal type="cash" />{" "}
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
    <Table headings={("cash", ["Where", "Amount", "Recorded"])} />
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
    {/* <!-- End of Cash Accounts Section --> */}
  </section>
);

export default CashAccountsSection;
