import React from "react"
import isNonEmptyString from "../../utils/utils"

import "./jumbotron.styles.scss"
import BtnLearnMore from "../../components/btn-learn-more/btn-learn-more.component"

const Jumbotron = ({ title, lead, content }) => {
  const isGoodContent = isNonEmptyString(content)

  return (
    <div className="jumbotron">
      <h1 className="display-3">{title}</h1>
      <p className="lead">{lead}</p>
      {isGoodContent && (
        <React.Fragment>
          <hr className="my-4" />
          <p>{content}</p>
        </React.Fragment>
      )}
      <BtnLearnMore />
    </div>
  )
}

export default Jumbotron
