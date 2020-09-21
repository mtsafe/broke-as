import React from "react";
import isNonEmptyString from "../../utils/utils";

import "./jumbotron.styles.scss";
import BtnLearnMore from "../../components/btn-learn-more/btn-learn-more.component";

const JumbotronContent = ({ content }) => {
  if (isNonEmptyString(content)) {
    return (
      <React.Fragment>
        <hr className="my-4" />
        <p>{content}</p>
      </React.Fragment>
    );
  }
  return null;
};

const Jumbotron = (props) => {
  return (
    <div className="jumbotron">
      <h1 className="display-3">{props.title}</h1>
      <p className="lead">{props.lead}</p>
      <JumbotronContent content={props.content} />
      <BtnLearnMore />
    </div>
  );
};

export default Jumbotron;
