import React from "react";
import isNonEmptyString from "../../utils/utils";

import "./jumbotron.styles.scss";
import BtnLearnMore from "../../components/btn-learn-more/btn-learn-more.component";

const Jumbotron = (props) => {
  if (isNonEmptyString(props.content)) {
    return (
      <div className="jumbotron">
        <h1 className="display-3">{props.title}</h1>
        <p className="lead">{props.lead}</p>
        <hr className="my-4" />
        <p>{props.content}</p>
        <BtnLearnMore />
      </div>
    );
  }

  return (
    <div className="jumbotron">
      <h1 className="display-3">{props.title}</h1>
      <p className="lead">{props.lead}</p>
      <BtnLearnMore />
    </div>
  );
};

export default Jumbotron;
