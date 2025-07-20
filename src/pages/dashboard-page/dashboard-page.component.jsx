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
        lead="This page will display visualizations."
        content="; )"
      />
    </main>
  </div>
)

export default DashboardPage
