import React from "react";

import "./intro-page.styles.scss";

import masks2 from '../../img/masks2.jpg';

const IntroPage = (props) => (
  <div id="IntroPage">
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
      <div id="intro">
        <p className="">
          Let us start by saying,{" "}
          <span className="text-warning">"We are sorry."</span>{" "}
          It's a sad situtation that you need this app for your finances. You
          have fallen on hard times, and you are desperate for help. Your
          accounts are getting down to the wire. You are too ashamed to ask for
          help. You are not even sure anyone can help.
        </p>
        <p>
          <span className="text-info">"It's going to be okay."</span>{" "}
          Of course we don't actually know if it will be okay, but repeating
          this may help you feel better. This is important, because you need
          some confidence to face your situtation otherwise you just can't even.
        </p>
      </div>
      <div id="caveat" className="alert alert-dismissible alert-danger">
        <h2>STRONG WARNING!</h2>
        <p>
          Look, we are not accountants, lawyers, financial coaches, etc; we are
          just software engineers with a dumb app. We have no formal training in
          finances.{" "}
          <span className="text-muted">(We are not even good at math!)</span>{" "}
          Nonetheless, you have turned here for help...
        </p>
      </div>
      <button type="button" className="btn btn-link btn-lg btn-outline-success">
        <a href="./home.html">Click to Next Page</a>
      </button>
    </main>
  </div>
);

export default IntroPage;
