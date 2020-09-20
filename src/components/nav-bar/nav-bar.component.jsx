import React from "react";
import "./nav-bar.styles.scss";
import { NavLinks } from "../nav-links/nav-links.component";

class NavBar extends React.Component {
  constructor({ currentPage, ...otherProps }) {
    super();
    this.state = {
      thisPage: currentPage,
    };
  }

  render() {
    const active = this.state.thisPage === "Intro" ? false : true;
    const pages = [
      { key: 1, title: "Home", url: "/home" },
      { key: 2, title: "Dashboard", url: "/dashboard" },
      { key: 3, title: "Accounts", url: "/accounts" },
      { key: 4, title: "WTF", url: "/wtf" },
      { key: 5, title: "About", url: "/about" },
    ];
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          <div id="logo">
            <h1>
              <span className="tight">Broke-</span>
              <span id="hanging" className="tight post-it">
                As
              </span>
            </h1>
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
        <NavLinks pages={pages} active={active}/>
        <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search"
            />
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    );
  }
}

export default NavBar;
