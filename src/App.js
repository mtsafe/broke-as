import React, { Component } from "react";
import "./assets/App.scss";

import IntroPage from './pages/intro-page/intro-page.component';

import NavBar from "./components/nav-bar/nav-bar.component";
import Copyright from "./components/copyright/copyright.component";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar currentPage='Intro' />
        <IntroPage />
        <footer>
          <Copyright />
        </footer>
      </div>
    );
  }
}

export default App;
