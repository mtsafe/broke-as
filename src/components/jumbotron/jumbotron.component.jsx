import React from "react"
import isNonEmptyString from "../../utils/utils"

import "./jumbotron.styles.scss"
import BtnLearnMore from "../../components/btn-learn-more/btn-learn-more.component"

const Jumbotron = ({ title, lead, content }) => {
  const isGoodContent = isNonEmptyString(content)

  return (
    <div className="jumbotron">
      <header id="jumbotron-header">
        <h1 className="display-3">{title}</h1>
      </header>
      <p className="lead">{lead}</p>
      {isGoodContent && (
        <React.Fragment>
          <hr className="style-2" />
          <p>{content}</p>
        </React.Fragment>
      )}
      <hr className="my-4" />
      <footer id="jumbotron-footer">
        <BtnLearnMore />
      </footer>
    </div>
  )
}

export default Jumbotron
