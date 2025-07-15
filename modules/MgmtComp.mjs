// The Management Component

import { DataCtrl } from './Data.mjs';
import { AcctUICtrl } from './UI.mjs';

const cfgData = 'Config';
const AppStates = {};
const MC = {};

// Management COMPONENT //
class MgmtComp {
  constructor (appName, appType) {
    // declare the AppStates
    AppStates.hideAEd = `hide-${appName}-editor`;
    AppStates.dispNewAEd = `display-new-${appName}-editor`;
    AppStates.dispModAEd = `display-mod-${appName}-editor`;
    // have an object for the management component per appName
    if (MC[appName] === undefined) {
      MC[appName] = {};
    }
    // declare the name to be used for the corresponding data
    MC[appName].dataName = appName[0].toUpperCase() + appName.substring(1);
    // get the data from local storage
    const items = DataCtrl.getItems(MC[appName].dataName);
    // create the UI object
    MC[appName].UI = new AcctUICtrl(appName);
    // declare the UIIds
    MC[appName].UIIds = MC[appName].UI.getSelectors();
    MC[appName].UIIds.onHandNeed = `${appName}-onhand-need`;
    MC[appName].UIIds.onHandOkay = `${appName}-onhand-okay`;
    // apply configuration data
    this.initConfig(appName);
    // fill in the UI
    if (items.length === 0) {
      MgmtComp.setAppState(appName, appType, AppStates.dispNewAEd);
    } else {
      MC[appName].UI.populateTrList(items, appType);
      MgmtComp.setAppState(appName, appType, AppStates.hideAEd);
    }
    MC[appName].UI.showTotalAmount(
      DataCtrl.getTotalCents(MC[appName].dataName),
      DataCtrl.getItemByName(cfgData, MC[appName].UIIds.onHandNeed).obj.pennies,
      DataCtrl.getItemByName(cfgData, MC[appName].UIIds.onHandOkay).obj.pennies);
    // load the event listeners
    this.loadEventListeners(appName, appType);
  }

  static setAppState(appName, appType, state) {
    switch (state) {
      case AppStates.hideAEd:
        MC[appName].UI.editStateOff(appType);
        DataCtrl.setCurrentItem(MC[appName].dataName, null);
        break;
      case AppStates.dispNewAEd:
        MC[appName].UI.editStateAddCash();
        break;
      case AppStates.dispModAEd:
        MC[appName].UI.editStateModCash();
        break;
    }
  }

  loadEventListeners(appName, appType) {
    document.addEventListener('keypress', function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });
    document.querySelector(MC[appName].UIIds.addBtn).addEventListener(
      'click', this.addBtnClick.bind(null, appName, appType));
    document.querySelector(MC[appName].UIIds.addTrBtn).addEventListener(
      'click', this.addTrBtnClick.bind(null, appName, appType));
    document.querySelector(MC[appName].UIIds.backBtn).addEventListener(
      'click', this.backBtnClick.bind(null, appName));
    document.querySelector(MC[appName].UIIds.clearBtn).addEventListener(
      'click', this.clearAllItemsBtnClick.bind(null, appName, appType));
    document.querySelector(MC[appName].UIIds.deleteBtn).addEventListener(
      'click', this.deleteBtnClick.bind(null, appName, appType));
    document.querySelector(MC[appName].UIIds.trList).addEventListener(
      'click', this.editTrBtnClick.bind(null, appName, appType));
    document.querySelector(MC[appName].UIIds.updateBtn).addEventListener(
      'click', this.updateBtnClick.bind(null, appName, appType));
    document.querySelector(MC[appName].UIIds.locationSelect).addEventListener(
      'change', this.locationSelectChange.bind(null, appName));
    $(MC[appName].UIIds.assessmentModal)
      .on('show.bs.modal', this.badgeModalOnDisplay.bind(null, appName));
    $(MC[appName].UIIds.assessmentModal)
      .on('hide.bs.modal', this.badgeModalOnHide.bind(null, appName));
    $(MC[appName].UIIds.modalAlert)
      .on('close.bs.alert', this.badgeModalOnClose.bind(null, appName));
  }

  badgeModalOnDisplay(appName, e) {
    let amt;
    amt = parseInt(DataCtrl.getItemByName(cfgData,
      MC[appName].UIIds.onHandNeed).obj.pennies / 100);
    document.querySelector(MC[appName].UIIds.modalNeed).value = amt;
    amt = parseInt(DataCtrl.getItemByName(cfgData,
      MC[appName].UIIds.onHandOkay).obj.pennies / 100);
    document.querySelector(MC[appName].UIIds.modalOkay).value = amt;
  }

  badgeModalOnHide(appName, e) {
    let itemToEdit, amtNeed, amtOkay;
    const dataStore = cfgData;
    amtNeed = document.querySelector(MC[appName].UIIds.modalNeed).value;
    if (parseInt(amtNeed) < 0) {
      const modalAlert = document.querySelector(MC[appName].UIIds.ModalAlert);
      modalAlert.classList = "alert alert-dismissible alert-danger";
      modalAlert.innerHTML = `<button type="button" class="close" data-dismiss="alert">&times;</button>The minimum needed [<strong>$${amtNeed}</strong>] must be greater or equal to than zero.`;
      e.preventDefault();
      return;
    }
    amtOkay = document.querySelector(MC[appName].UIIds.modalOkay).value;
    if (parseInt(amtOkay) < parseInt(amtNeed)) {
      const modalAlert = document.querySelector(MC[appName].UIIds.modalAlert);
      modalAlert.classList = "alert alert-dismissible alert-danger";
      modalAlert.innerHTML = `<button type="button" class="close" data-dismiss="alert">&times;</button>The minimum okay [<strong>$${amtOkay}</strong>] must be greater or equal to than the minimum needed [<strong>$${amtNeed}</strong>].`;
      e.preventDefault();
      return;
    }
    itemToEdit = DataCtrl.getItemByName(dataStore, MC[appName].UIIds.onHandNeed);
    DataCtrl.setCurrentItem(dataStore, itemToEdit);
    DataCtrl.updateItem(dataStore, MC[appName].UIIds.onHandNeed,
      { pennies: parseInt(amtNeed + '00') } );
    itemToEdit = DataCtrl.getItemByName(dataStore, MC[appName].UIIds.onHandOkay);
    DataCtrl.setCurrentItem(dataStore, itemToEdit);
    DataCtrl.updateItem(dataStore, MC[appName].UIIds.onHandOkay,
      { pennies: parseInt(amtOkay + '00') } );
    MC[appName].UI.showTotalAmount(
      DataCtrl.getTotalCents(MC[appName].dataName),
      DataCtrl.getItemByName(cfgData, MC[appName].UIIds.onHandNeed).obj.pennies,
      DataCtrl.getItemByName(cfgData, MC[appName].UIIds.onHandOkay).obj.pennies);
  }

  badgeModalOnClose(appName, e) {
    const modalAlert = document.querySelector(MC[appName].UIIds.modalAlert);
    modalAlert.classList = "";
    modalAlert.innerHTML = "";
    e.preventDefault();
  }

  addBtnClick(appName, appType, e) {
    const { name, pennies, date, freq, ending } = MC[appName].UI.getItemInput(appType);
    let newItem = {};
    if (name === '' || pennies === 0) {
      e.preventDefault();
      return;
    }
    switch (appType) {
      case 'onHand':
        newItem = DataCtrl.addItem(MC[appName].dataName, name,
          { pennies });
        break;
      case 'recur':
        if (date === "" || freq === "Click to set frequency"
          || ending === "Endless") {
          e.preventDefault();
          return;
        }
        newItem = DataCtrl.addItem(MC[appName].dataName, name,
          { pennies, date, freq, ending });
        break;
    }
    MC[appName].UI.addTrItem(newItem, appType);
    MC[appName].UI.populateTrList(DataCtrl.getItems(MC[appName].dataName), appType);
    MC[appName].UI.showTotalAmount(
      DataCtrl.getTotalCents(MC[appName].dataName),
      DataCtrl.getItemByName(cfgData, MC[appName].UIIds.onHandNeed).obj.pennies,
      DataCtrl.getItemByName(cfgData, MC[appName].UIIds.onHandOkay).obj.pennies);
    MgmtComp.setAppState(appName, appType, AppStates.hideAEd);
    e.preventDefault();
  }

  addTrBtnClick(appName, appType, e) {
    MgmtComp.setAppState(appName, appType, AppStates.dispNewAEd);
  }

  backBtnClick(appName, e) {
    MgmtComp.setAppState(appName, appType, AppStates.hideAEd);
  }

  deleteBtnClick(appName, appType, e) {
    const currentItem = DataCtrl.getCurrentItem(MC[appName].dataName);
    DataCtrl.deleteItem(MC[appName].dataName, currentItem.id);
    MC[appName].UI.deleteTrItem(currentItem.id);
    MC[appName].UI.populateTrList(DataCtrl.getItems(MC[appName].dataName), appType);
    MC[appName].UI.showTotalAmount(
      DataCtrl.getTotalCents(MC[appName].dataName),
      DataCtrl.getItemByName(cfgData, MC[appName].UIIds.onHandNeed).obj.pennies,
      DataCtrl.getItemByName(cfgData, MC[appName].UIIds.onHandOkay).obj.pennies);
    MgmtComp.setAppState(appName, appType, AppStates.hideAEd);
    e.preventDefault();
  }

  updateBtnClick(appName, appType, e) {
    const { name, pennies, date, freq, ending } = MC[appName].UI.getItemInput(appType);
    let updatedItem = {};
    switch (appType) {
      case 'onHand':
        updatedItem = DataCtrl.updateItem(MC[appName].dataName, name,
          { pennies });
        break;
      case 'recur':
        updatedItem = DataCtrl.updateItem(MC[appName].dataName, name,
          { pennies, date, freq, ending });
        break;
    }
    MC[appName].UI.updateTrItem(updatedItem, appType);
    MC[appName].UI.showTotalAmount(
      DataCtrl.getTotalCents(MC[appName].dataName),
      DataCtrl.getItemByName(cfgData, MC[appName].UIIds.onHandNeed).obj.pennies,
      DataCtrl.getItemByName(cfgData, MC[appName].UIIds.onHandOkay).obj.pennies);
    MgmtComp.setAppState(appName, appType, AppStates.hideAEd);
    e.preventDefault();
  }

  editTrBtnClick(appName, appType, e) {
    if (e.target.classList.contains('edit-item')) {
      const listId = e.target.parentNode.parentNode.parentNode.id;
      const listIdArr = listId.split('-');
      const id = parseInt(listIdArr[1]);
      const itemToEdit = DataCtrl.getItemById(MC[appName].dataName, id);
      DataCtrl.setCurrentItem(MC[appName].dataName, itemToEdit);
      MC[appName].UI.putItemToForm(itemToEdit, appType);
      MgmtComp.setAppState(appName, appType, AppStates.dispModAEd);
    }
    e.preventDefault();
  }

  clearAllItemsBtnClick(appName, appType) {
    DataCtrl.clearAllItems(MC[appName].dataName);
    MC[appName].UI.showTotalAmount(
      DataCtrl.getTotalCents(MC[appName].dataName),
      DataCtrl.getItemByName(cfgData, MC[appName].UIIds.onHandNeed).obj.pennies,
      DataCtrl.getItemByName(cfgData, MC[appName].UIIds.onHandOkay).obj.pennies);
    MC[appName].UI.emptyTableBody();
    MgmtComp.setAppState(appName, appType, AppStates.dispNewAEd);
  }

  locationSelectChange(appName) {
    document.querySelector(MC[appName].UIIds.nameInput).value =
    document.querySelector(MC[appName].UIIds.locationSelect).value;
  }

  initConfig(appName) {
    DataCtrl.getItems(cfgData);   // prep local storage for configuration data
    if (DataCtrl.getItemByName(cfgData, MC[appName].UIIds.onHandNeed) === undefined) {
      DataCtrl.addItem(cfgData, MC[appName].UIIds.onHandNeed, { pennies: 1000 });
    }
    if (DataCtrl.getItemByName(cfgData, MC[appName].UIIds.onHandOkay) === undefined) {
      DataCtrl.addItem(cfgData, MC[appName].UIIds.onHandOkay, { pennies: 2500 });
    }
  }
}

export { MgmtComp };
