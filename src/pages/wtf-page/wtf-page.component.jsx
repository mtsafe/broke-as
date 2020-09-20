import React from "react";

import "./wtf-page.style.scss";
import masks2 from "../../assets/img/masks2.jpg";

import Jumbotron from "../../components/jumbotron/jumbotron.component";
import NavBar from "../../components/nav-bar/nav-bar.component";

const WTFPage = (props) => (
  <div id="WTFPage">
    {/* <!-- NavBar --> */}
    <NavBar currentPage="WTF" />
    {/* <!-- Header --> */}
    <header>
      <blockquote className="blockquote">
        <img
          id="header-image"
          className="tight"
          src={masks2}
          alt="Laughing/crying theater masks"
        />{" "}
        <div id="header-text" className="tight">
          <p className="mb-0">"It's a tragedy."</p>
          <footer className="blockquote-footer">
            William Shakespeare,{" "}
            <cite title="Source Title">Once Upon A Time</cite>
          </footer>
        </div>
      </blockquote>
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
