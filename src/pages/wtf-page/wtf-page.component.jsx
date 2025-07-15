import React from "react";

import "./wtf-page.style.scss";
import masks2 from "../../assets/img/masks2.jpg";

import Jumbotron from "../../components/jumbotron/jumbotron.component";
import NavBar from "../../components/nav-bar/nav-bar.component";
import Quotation from "../../components/quotation/quotation.component";

const WTFPage = (props) => (
  <div id="WTFPage">
    {/* <!-- NavBar --> */}
    <NavBar currentPage="WTF" />
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
        title="My Financial WTF"
        lead="This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information."
        content="It uses utility classes for typography and spacing to space content out within the larger container."
      />
    </main>
  </div>
);

export default WTFPage;
