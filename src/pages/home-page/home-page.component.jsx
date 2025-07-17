import React from "react"

import "./home-page.style.scss"

import BtnLearnMore from "../../components/btn-learn-more/btn-learn-more.component"
import NavBar from "../../components/nav-bar/nav-bar.component"
import Impression from "../../components/impression/impression.component"

const HomePage = props => (
  <div id="HomePage">
    <NavBar currentPage="Home" />
    <header>
      <Impression id="tragedy" />
    </header>
    <main>
      <div className="jumbotron">
        <h1 className="display-3">My Financial Home</h1>
        <p className="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr className="my-4" />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
        <BtnLearnMore />
      </div>
    </main>
  </div>
)

export default HomePage
