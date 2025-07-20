import React from "react"

import "./home-page.style.scss"

import Jumbotron from "../../components/jumbotron/jumbotron.component"
import NavBar from "../../components/nav-bar/nav-bar.component"
import Impression from "../../components/impression/impression.component"

const HomePage = props => (
  <div id="HomePage">
    <NavBar currentPage="Home" />
    <header>
      <Impression id="tragedy" />
    </header>
    <main>
      <Jumbotron
        title="My Financial Home"
        lead="This page gives notifications, etc."
        content="Time to get serious."
      />
    </main>
  </div>
)

export default HomePage
