import { MgmtComp } from './MgmtComp.mjs';

// App CONTROLLER //
class App {
  CashComp = null;

  constructor() {
    this.CashComponent = new MgmtComp('cash', 'onHand');
    this.ReceivablesComponent = new MgmtComp('recv', 'recur');
  }
}

// :: BEGIN EXECUTION ::
const AccountsPage = new App();
