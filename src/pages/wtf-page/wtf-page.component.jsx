import React from "react"

import "./wtf-page.style.scss"

import Jumbotron from "../../components/jumbotron/jumbotron.component"
import NavBar from "../../components/nav-bar/nav-bar.component"
import Impression from "../../components/impression/impression.component"

const WTFPage = props => (
  <div id="WTFPage">
    <NavBar currentPage="WTF" />
    <header>
      <Impression id="tragedy" />
    </header>
    <main>
      <Jumbotron
        title="My Financial WTF"
        lead="This page will give suggestions based upon the data."
        content="Do something good for someone."
      />
    </main>
  </div>
)

export default WTFPage
