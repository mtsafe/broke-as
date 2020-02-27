// The Management Component

// This project uses the Module Pattern

import { DataCtrl } from './Data.mjs';
import { AcctUICtrl } from './UI.mjs';


// :: CONTROLLERS ::
// Item CONTROLLER :: const DataCtrl
  // Public Methods
  // // getItems, addItem, getItemById, updateItem, deleteItem,
  // // clearAllItems, setCurrentItem, getCurrentItem, getTotalCents
// UI CONTROLLER :: const UICtrl
  // Public Methods
  // // populateTrList, getItemInput, addTrItem, deleteTrItem,
  // // updateTrItem, clearInput, putCurrentItemToForm, emptyTableBody,
  // // showTotalAmount, editStateAddCash, editStateModCash, getSelectors
// App CONTROLLER :: const App = (function(DataCtrl, StorageCtrl, UICtrl) {
  // Public Methods
  // // init
const cfgData = 'Config';
const AppStates = {};
const MC = {};

// Management COMPONENT //
class MgmtComp {
  constructor (appName) {
    console.log('constructor');
    AppStates.hideAEd = `hide-${appName}-editor`;
    AppStates.dispNewAEd = `display-new-${appName}-editor`;
    AppStates.dispModAEd = `display-mod-${appName}-editor`;
    if (MC[appName] === undefined) {
      MC[appName] = {};
    }
    MC[appName].UI = new AcctUICtrl(appName);
    if (MC[appName].UIIds === undefined) {
      MC[appName].UIIds = MC[appName].UI.getSelectors();
      MC[appName].UIIds.onHandNeed = `${appName}-onhand-need`;
      MC[appName].UIIds.onHandOkay = `${appName}-onhand-okay`;
      this.initConfig(appName);
    };
    MC[appName].dataName = appName[0].toUpperCase() + appName.substring(1);
    const items = DataCtrl.getItems(MC[appName].dataName);
    console.log('items = ', items);
    if (items.length === 0) {
      MgmtComp.setAppState(appName, AppStates.dispNewAEd);
    } else {
      MC[appName].UI.populateTrList(items);
      MgmtComp.setAppState(appName, AppStates.hideAEd);
    }
    MC[appName].UI.showTotalAmount(
      DataCtrl.getTotalCents(MC[appName].dataName),
      DataCtrl.getItemByName(cfgData, MC[appName].UIIds.onHandNeed).obj.pennies,
      DataCtrl.getItemByName(cfgData, MC[appName].UIIds.onHandOkay).obj.pennies);
    this.loadEventListeners(appName);
  }

  static setAppState(appName, state) {
    switch (state) {
      case AppStates.hideAEd:
        MC[appName].UI.editStateOff();
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

  loadEventListeners(appName) {
    document.addEventListener('keypress', function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });
    document.querySelector(MC[appName].UIIds.addBtn).addEventListener(
      'click', this.addBtnClick);
    document.querySelector(MC[appName].UIIds.addTrBtn).addEventListener(
      'click', this.addTrBtnClick);
    document.querySelector(MC[appName].UIIds.backBtn).addEventListener(
      'click', this.backBtnClick);
    document.querySelector(MC[appName].UIIds.clearBtn).addEventListener(
      'click', this.clearAllItemsBtnClick);
    document.querySelector(MC[appName].UIIds.deleteBtn).addEventListener(
      'click', this.deleteBtnClick);
    document.querySelector(MC[appName].UIIds.trList).addEventListener(
      'click', this.editTrBtnClick);
    document.querySelector(MC[appName].UIIds.updateBtn).addEventListener(
      'click', this.updateBtnClick);
    document.querySelector(MC[appName].UIIds.locationSelect).addEventListener(
      'change', this.locationSelectChange);
    $(MC[appName].UIIds.assessmentModal).on('show.bs.modal', this.badgeModalOnDisplay);
    $(MC[appName].UIIds.assessmentModal).on('hide.bs.modal', this.badgeModalOnHide);
    $(MC[appName].UIIds.modalAlert).on('close.bs.alert', this.badgeModalOnClose);
  }

  badgeModalOnDisplay(e) {
    const appName = this.id.replace(/-.+/,'');
    let amt;
    amt = parseInt(DataCtrl.getItemByName(cfgData,
      MC[appName].UIIds.onHandNeed).obj.pennies / 100);
    document.querySelector(MC[appName].UIIds.modalNeed).value = amt;
    amt = parseInt(DataCtrl.getItemByName(cfgData,
      MC[appName].UIIds.onHandOkay).obj.pennies / 100);
    document.querySelector(MC[appName].UIIds.modalOkay).value = amt;
  }

  badgeModalOnHide(e) {
    const appName = this.id.replace(/-.+/,'');
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

  badgeModalOnClose(e) {
    const appName = this.id.replace(/-.+/,'');
    const modalAlert = document.querySelector(MC[appName].UIIds.modalAlert);
    modalAlert.classList = "";
    modalAlert.innerHTML = "";
    e.preventDefault();
  }

  addBtnClick(e) {
    const appName = this.id.replace(/-.+/,'');
    const { name, pennies } = MC[appName].UI.getItemInput();
    if (name !== '' && pennies !== '') {
      const newItem =
        DataCtrl.addItem(MC[appName].dataName, name, { pennies } );
      MC[appName].UI.addTrItem(newItem);
      MC[appName].UI.populateTrList(DataCtrl.getItems(MC[appName].dataName));
      MC[appName].UI.showTotalAmount(
        DataCtrl.getTotalCents(MC[appName].dataName),
        DataCtrl.getItemByName(cfgData, MC[appName].UIIds.onHandNeed).obj.pennies,
        DataCtrl.getItemByName(cfgData, MC[appName].UIIds.onHandOkay).obj.pennies);
      MgmtComp.setAppState(appName, AppStates.hideAEd);
    }
    e.preventDefault();
  }

  addTrBtnClick(e) {
    const appName = this.id.replace(/-.+/,'');
    MgmtComp.setAppState(appName, AppStates.dispNewAEd);
  }

  backBtnClick(e) {
    const appName = this.id.replace(/-.+/,'');
    MgmtComp.setAppState(appName, AppStates.hideAEd);
  }

  deleteBtnClick(e) {
    const appName = this.id.replace(/-.+/,'');
    const currentItem = DataCtrl.getCurrentItem(MC[appName].dataName);
    DataCtrl.deleteItem(MC[appName].dataName, currentItem.id);
    MC[appName].UI.deleteTrItem(currentItem.id);
    MC[appName].UI.populateTrList(DataCtrl.getItems(MC[appName].dataName));
    MC[appName].UI.showTotalAmount(
      DataCtrl.getTotalCents(MC[appName].dataName),
      DataCtrl.getItemByName(cfgData, MC[appName].UIIds.onHandNeed).obj.pennies,
      DataCtrl.getItemByName(cfgData, MC[appName].UIIds.onHandOkay).obj.pennies);
    MgmtComp.setAppState(appName, AppStates.hideAEd);
    e.preventDefault();
  }

  updateBtnClick(e) {
    const appName = this.id.replace(/-.+/,'');
    const { name, pennies } = MC[appName].UI.getItemInput();
    const updatedItem = DataCtrl.updateItem(MC[appName].dataName, name, { pennies });
    MC[appName].UI.updateTrItem(updatedItem);
    MC[appName].UI.showTotalAmount(
      DataCtrl.getTotalCents(MC[appName].dataName),
      DataCtrl.getItemByName(cfgData, MC[appName].UIIds.onHandNeed).obj.pennies,
      DataCtrl.getItemByName(cfgData, MC[appName].UIIds.onHandOkay).obj.pennies);
    MgmtComp.setAppState(appName, AppStates.hideAEd);
    e.preventDefault();
  }

  editTrBtnClick(e) {
    if (e.target.classList.contains('edit-item')) {
      const appName = this.id.replace(/-.+/,'');
      const listId = e.target.parentNode.parentNode.parentNode.id;
      const listIdArr = listId.split('-');
      const id = parseInt(listIdArr[1]);
      const itemToEdit = DataCtrl.getItemById(MC[appName].dataName, id);
      DataCtrl.setCurrentItem(MC[appName].dataName, itemToEdit);
      MC[appName].UI.putItemToForm(itemToEdit);
      MgmtComp.setAppState(appName, AppStates.dispModAEd);
    }
    e.preventDefault();
  }

  clearAllItemsBtnClick() {
    const appName = this.id.replace(/-.+/,'');
    DataCtrl.clearAllItems(MC[appName].dataName);
    MC[appName].UI.showTotalAmount(
      DataCtrl.getTotalCents(MC[appName].dataName),
      DataCtrl.getItemByName(cfgData, MC[appName].UIIds.onHandNeed).obj.pennies,
      DataCtrl.getItemByName(cfgData, MC[appName].UIIds.onHandOkay).obj.pennies);
    MC[appName].UI.emptyTableBody();
    MgmtComp.setAppState(appName, AppStates.dispNewAEd);
  }

  locationSelectChange() {
    const appName = this.id.replace(/-.+/,'');
    document.querySelector(MC[appName].UIIds.nameInput).value =
    document.querySelector(MC[appName].UIIds.locationSelect).value;
  }

  initConfig(appName) {
    DataCtrl.addItem(cfgData, MC[appName].UIIds.onHandNeed, { pennies: 1000 });
    DataCtrl.addItem(cfgData, MC[appName].UIIds.onHandOkay, { pennies: 2500 });
  }
}

export { MgmtComp };