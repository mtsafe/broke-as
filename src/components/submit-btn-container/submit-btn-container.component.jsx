import React from "react";

import BtnOutline from "../../components/btn-outline/btn-outine.component";

const SubmitBtnContainer = ({ type }) => {
  return (
    <div id={type + "-submit-buttons"} className="float-left">
      <BtnOutline
        id={type + "-add-btn"}
        type="info"
        faIcon="fa fa-plus"
        label="Add Money Location"
      />
      <BtnOutline
        id={type + "-update-btn"}
        type="warning"
        faIcon="fa fa-pencil-square-o"
        label="Update Money"
      />
      <BtnOutline
        id={type + "-delete-btn"}
        type="danger"
        faIcon="fa fa-remove"
        label="Delete Money Location"
      />
    </div>
  );
};

export default SubmitBtnContainer;
