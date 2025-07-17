import React from "react"

import "./home-page.style.scss"
import masks2 from "../../assets/img/masks2.jpg"

import BtnLearnMore from "../../components/btn-learn-more/btn-learn-more.component"
import NavBar from "../../components/nav-bar/nav-bar.component"
import Quotation from "../../components/quotation/quotation.component"

const HomePage = props => (
  <div id="HomePage">
    <NavBar currentPage="Home" />
    <header>
      <Quotation
        imgSrc={masks2}
        quote="It's a tragedy."
        author="William Shakespeare"
        source="Once Upon A Time"
      />
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
