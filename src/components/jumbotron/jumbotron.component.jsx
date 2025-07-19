import React from "react"
import { isNonEmptyArray, isNonEmptyString } from "../../utils/utils"

import "./jumbotron.styles.scss"
import BtnLearnMore from "../../components/btn-learn-more/btn-learn-more.component"

const wrapStringIntoParagraph = str => {
  return (
    <React.Fragment>
      <hr className="style-2" />
      <p>{str}</p>
    </React.Fragment>
  )
}

const wrapIndexedElement = (element, index) => {
  return (
    <React.Fragment key={index}>
      <hr className="style-2" />
      {element}
    </React.Fragment>
  )
}

const wrapIndexedObject = (obj, index) => {
  if (React.isValidElement(obj)) return wrapIndexedElement(obj, index)
}

const jumbotronContent = content => {
  if (React.isValidElement(content)) return content
  if (isNonEmptyString(content)) return wrapStringIntoParagraph(content)
  if (isNonEmptyArray(content)) {
    return <>{content.map((obj, index) => wrapIndexedObject(obj, index))}</>
  }
}

const Jumbotron = ({ title, lead, content }) => {
  return (
    <div className="jumbotron">
      <header id="jumbotron-header">
        <h1 className="display-3">{title}</h1>
      </header>
      <p className="lead">{lead}</p>
      {jumbotronContent(content)}
      <hr className="my-4" />
      <footer id="jumbotron-footer">
        <BtnLearnMore />
      </footer>
    </div>
  )
}

export default Jumbotron
