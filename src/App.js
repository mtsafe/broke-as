import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./assets/App.scss";

import IntroPage from "./pages/intro-page/intro-page.component";
import AccountsPage from "./pages/accounts-page/accounts-page.component";
import AboutPage from "./pages/about-page/about-page.component";
import DashboardPage from "./pages/dashboard-page/dashboard-page.component";
import HomePage from "./pages/home-page/home-page.component";
import WTFPage from "./pages/wtf-page/wtf-page.component";

import Copyright from "./components/copyright/copyright.component";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/accounts" component={AccountsPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/wtf" component={WTFPage} />
          <Route path="/" component={IntroPage} />
        </Switch>
        <footer>
          <Copyright />
        </footer>
      </div>
    );
  }
}

export default App;
