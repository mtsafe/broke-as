import React from "react";
import "./nav-bar.styles.scss";

const NavBar = (props) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="/">
      <div id="logo">
        <h1><span className="tight">Broke-</span><span id="hanging"
          className="tight post-it">As</span></h1>
      </div>
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarColor03"
      aria-controls="navbarColor03"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarColor03">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <a className="nav-link" href="./home.html">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="./dashboard.html">Dashboard</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="./accounts.html">Accounts</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="./wtf.html">WTF</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="./about.html">About</a>
        </li>
      </ul>
      <form className="form-inline my-2 my-lg-0">
        <input className="form-control mr-sm-2" type="text"
          placeholder="Search" />
        <button className="btn btn-secondary my-2 my-sm-0"
          type="submit">Search</button>
      </form>
    </div>
  </nav>
);

export default NavBar;