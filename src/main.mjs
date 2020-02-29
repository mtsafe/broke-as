// This project uses the Module Pattern

import { MgmtComp } from './MgmtComp.mjs';


// App CONTROLLER //
class App {
  CashComp = null;

  // App Public Methods
  // // init
  constructor() {
    this.CashComponent = new MgmtComp('cash');
    this.ReceivablesComponent = new MgmtComp('recv');
  }
}

// :: BEGIN EXECUTION ::
const AccountsPage = new App();