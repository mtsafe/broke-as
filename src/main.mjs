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
(function () {
  const input = document.getElementById('recur-end-date-input');
  const datepicker = new TheDatepicker.Datepicker(input);
  datepicker.render();
})();

const AccountsPage = new App();