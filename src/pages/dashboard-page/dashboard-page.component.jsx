import React from "react"

import "./dashboard-page.module.scss"

import Jumbotron from "../../components/jumbotron/jumbotron.component"
import NavBar from "../../components/nav-bar/nav-bar.component"
import Impression from "../../components/impression/impression.component"

const DashboardPage = props => (
  <div id="DashboardPage">
    <NavBar currentPage="Dashboard" />
    <header>
      <Impression id="tragedy" />
    </header>
    <main>
      <Jumbotron
        title="My Financial Dashboard"
        lead="This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information."
        content="It uses utility classes for typography and spacing to space content out within the larger container."
      />
    </main>
  </div>
)

export default DashboardPage
