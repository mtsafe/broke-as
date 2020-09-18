import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./assets/App.scss";

import IntroPage from "./pages/intro-page/intro-page.component";
import DashboardPage from "./pages/dashboard-page/dashboard-page.component";
import AccountsPage from "./pages/accounts-page/accounts-page.component";

import Copyright from "./components/copyright/copyright.component";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/accounts" component={AccountsPage} />
          <Route path="/dashboard" component={DashboardPage} />
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
