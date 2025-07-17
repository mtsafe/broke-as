import React from "react"

import "./about-page.style.scss"

import Jumbotron from "../../components/jumbotron/jumbotron.component"
import NavBar from "../../components/nav-bar/nav-bar.component"
import Impression from "../../components/impression/impression.component"

const AboutPage = props => (
  <div id="AboutPage">
    <NavBar currentPage="About" />
    <header>
      <Impression id="comedy" />
    </header>
    <main>
      <Jumbotron
        title="About Broke-As"
        lead="This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information."
        content="This app is not for complex financial management like investments."
      />
    </main>
  </div>
)

export default AboutPage
