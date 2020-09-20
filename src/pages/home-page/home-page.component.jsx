import React from "react";

import "./home-page.style.scss";
import masks2 from "../../assets/img/masks2.jpg";

import NavBar from "../../components/nav-bar/nav-bar.component";

const HomePage = (props) => (
  <div id="HomePage">
    {/* <!-- NavBar --> */}
    <NavBar currentPage="Home" />
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
      <div className="jumbotron">
        <h1 className="display-3">My Financial Home</h1>
        <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr className="my-4" />
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
        <p className="lead">
          <a className="btn btn-primary btn-lg" href="#HomePage" role="button">Learn more</a>
        </p>
      </div>
    </main>
  </div>
);

export default HomePage;
