// This doesn't work because you cannot inject JS string into JSX.
// It's a security risk.
import React from "react";
import isNonEmptyString from '../../utils/utils';

import "./jumbotron.styles.scss";
import BtnLearnMore from "../../components/btn-learn-more/btn-learn-more.component";

const Jumbotron = (props) => {
  let theContent="";
  if (isNonEmptyString(props.content)) {
    theContent = `
      <hr className="my-4" />
      <p>${props.content}</p>`
  }

  return (
    <div className="jumbotron">
      <h1 className="display-3">{props.title}</h1>
      <p className="lead">{props.lead}</p>
        {theContent}
      <BtnLearnMore />
    </div>
  );
}

export default Jumbotron;
