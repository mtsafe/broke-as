import React from "react";

import "./about-page.style.scss";
import masks2 from "../../assets/img/masks2.jpg";

import Jumbotron from "../../components/jumbotron/jumbotron.component";
import NavBar from "../../components/nav-bar/nav-bar.component";
import Quotation from "../../components/quotation/quotation.component";

const AboutPage = (props) => (
  <div id="AboutPage">
    {/* <!-- NavBar --> */}
    <NavBar currentPage="About" />
    {/* <!-- Header --> */}
    <header>
      <Quotation
        imgSrc={masks2}
        quote="It's a tragedy."
        author="William Shakespeare"
        citation="Once Upon A Time"
      />
    </header>
    {/* <!-- Main --> */}
    <main>
      <Jumbotron
        title="About Broke-As"
        lead="This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information."
        content="This app is not for complex financial management like investments."
      />
    </main>
  </div>
);

export default AboutPage;
