// This project uses the Module Pattern

import { DataCtrl } from './Data.mjs';
import { UICtrl } from './UI.mjs';

// Basic Structure
// Start with an IIFY - immediately invoked function expression
// (function () {
//   // Declare private variables and functions
//
//   return {
//     // Declare public variables and functions
//   }
// })();

// :: CONTROLLERS ::
// Storage CONTROLLER :: const StorageCtrl
  // Public Methods
  // // flush, storeItem, getItemsFromStorage, updateItemStorage
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

// App CONTROLLER //
const App = (function(DataCtrl, UICtrl) {
  const loadEventListeners = function() {
    const UISelectors = UICtrl.getSelectors();
    document.addEventListener('keypress', function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });
    document.querySelector(UISelectors.addBtn).addEventListener(
      'click', addBtnClick);
    document.querySelector(UISelectors.addTrBtn).addEventListener(
      'click', addTrBtnClick);
    document.querySelector(UISelectors.backBtn).addEventListener(
      'click', backBtnClick);
    document.querySelector(UISelectors.clearBtn).addEventListener(
      'click', clearAllItemsBtnClick);
    document.querySelector(UISelectors.deleteBtn).addEventListener(
      'click', deleteBtnClick);
    document.querySelector(UISelectors.trList).addEventListener(
      'click', editTrBtnClick);
    document.querySelector(UISelectors.updateBtn).addEventListener(
      'click', updateBtnClick);
    document.querySelector(UISelectors.locationSelect).addEventListener(
      'change', locationSelectChange);
    $(UISelectors.cashAssessmentModal).on('show.bs.modal', function (e) {
      let amt;
      amt = parseInt(DataCtrl.getItemByName('Config',
        'cash-onhand-need').obj.pennies / 100);
      document.querySelector(UISelectors.modalNeed).value = amt;
      amt = parseInt(DataCtrl.getItemByName('Config',
        'cash-onhand-okay').obj.pennies / 100);
      document.querySelector(UISelectors.modalOkay).value = amt;
    });
    $(UISelectors.cashAssessmentModal).on('hide.bs.modal', function (e) {
      let param, itemToEdit, amtNeed, amtOkay;
      const dataStore = 'Config';

      amtNeed = document.querySelector(UISelectors.modalNeed).value;
      if (parseInt(amtNeed) < 0) {
        const modalAlert = document.querySelector(UISelectors.cashModalAlert);
        modalAlert.classList = "alert alert-dismissible alert-danger";
        modalAlert.innerHTML = `<button type="button" class="close" data-dismiss="alert">&times;</button>The minimum needed [<strong>$${amtNeed}</strong>] must be greater or equal to than zero.`;
        e.preventDefault();
        return;
      }
      param = 'cash-onhand-need';
      itemToEdit = DataCtrl.getItemByName(dataStore, param);
      DataCtrl.setCurrentItem(dataStore, itemToEdit);
      DataCtrl.updateItem(dataStore, param, { pennies: parseInt(amtNeed + '00') } );

      amtOkay = document.querySelector(UISelectors.modalOkay).value;
      if (parseInt(amtOkay) < parseInt(amtNeed)) {
        const modalAlert = document.querySelector(UISelectors.cashModalAlert);
        modalAlert.classList = "alert alert-dismissible alert-danger";
        modalAlert.innerHTML = `<button type="button" class="close" data-dismiss="alert">&times;</button>The minimum okay [<strong>$${amtOkay}</strong>] must be greater or equal to than the minimum needed [<strong>$${amtNeed}</strong>].`;
        e.preventDefault();
        return;
      }
      param = 'cash-onhand-okay';
      itemToEdit = DataCtrl.getItemByName(dataStore, param);
      DataCtrl.setCurrentItem(dataStore, itemToEdit);
      DataCtrl.updateItem(dataStore, param, { pennies: parseInt(amtOkay + '00') } );

      UICtrl.showTotalAmount(
        DataCtrl.getTotalCents('Cash'),
        DataCtrl.getItemByName('Config', 'cash-onhand-need').obj.pennies,
        DataCtrl.getItemByName('Config', 'cash-onhand-okay').obj.pennies);
    });
    $(UISelectors.cashModalAlert).on('close.bs.alert', function (e) {
      const modalAlert = document.querySelector(UISelectors.cashModalAlert);
      modalAlert.classList = "";
      modalAlert.innerHTML = "";
      e.preventDefault();
    });
  };

  const addBtnClick = function(e) {
    const { name, pennies } = UICtrl.getItemInput();
    if (name !== '' && pennies !== '') {
      const newItem =
        DataCtrl.addItem('Cash', name, { pennies } );
      UICtrl.addTrItem(newItem);
      UICtrl.populateTrList(DataCtrl.getItems('Cash'));
      UICtrl.showTotalAmount(
        DataCtrl.getTotalCents('Cash'),
        DataCtrl.getItemByName('Config', 'cash-onhand-need').obj.pennies,
        DataCtrl.getItemByName('Config', 'cash-onhand-okay').obj.pennies);
      setAppState("hide-cash-editor");
    }
    e.preventDefault();
  };

  const addTrBtnClick = function(e) {
    setAppState("display-new-cash-editor");
  };

  const backBtnClick = function(e) {
    setAppState("hide-cash-editor");
  };

  const deleteBtnClick = function(e) {
    const currentItem = DataCtrl.getCurrentItem('Cash');
    DataCtrl.deleteItem('Cash', currentItem.id);
    UICtrl.deleteTrItem(currentItem.id);
    UICtrl.populateTrList(DataCtrl.getItems('Cash'));
    UICtrl.showTotalAmount(
      DataCtrl.getTotalCents('Cash'),
      DataCtrl.getItemByName('Config', 'cash-onhand-need').obj.pennies,
      DataCtrl.getItemByName('Config', 'cash-onhand-okay').obj.pennies);
    setAppState("hide-cash-editor");
    e.preventDefault();
  };

  const updateBtnClick = function(e) {
    const { name, pennies } = UICtrl.getItemInput();
    const updatedItem = DataCtrl.updateItem('Cash', name, { pennies });
    UICtrl.updateTrItem(updatedItem);
    UICtrl.showTotalAmount(
      DataCtrl.getTotalCents('Cash'),
      DataCtrl.getItemByName('Config', 'cash-onhand-need').obj.pennies,
      DataCtrl.getItemByName('Config', 'cash-onhand-okay').obj.pennies);
    setAppState("hide-cash-editor");
    e.preventDefault();
  };

  const editTrBtnClick = function(e) {
    if (e.target.classList.contains('edit-item')) {
      const listId = e.target.parentNode.parentNode.parentNode.id;
      const listIdArr = listId.split('-');
      const id = parseInt(listIdArr[1]);
      const itemToEdit = DataCtrl.getItemById('Cash', id);
      DataCtrl.setCurrentItem('Cash', itemToEdit);
      UICtrl.putItemToForm(itemToEdit);
      setAppState("display-mod-cash-editor");
    }
    e.preventDefault();
  };

  const clearAllItemsBtnClick = function() {
    DataCtrl.clearAllItems('Cash');
    UICtrl.showTotalAmount(
      DataCtrl.getTotalCents('Cash'),
      DataCtrl.getItemByName('Config', 'cash-onhand-need').obj.pennies,
      DataCtrl.getItemByName('Config', 'cash-onhand-okay').obj.pennies);
    UICtrl.emptyTableBody();
    setAppState("display-new-cash-editor");
  };

  const locationSelectChange = function() {
    document.querySelector('#cash-name').value =
    document.querySelector('#location-select').value;
  };

  const setAppState = function(state) {
    switch (state) {
      case "hide-cash-editor":
        UICtrl.editStateOff();
        DataCtrl.setCurrentItem('Cash', null);
        break;
      case "display-new-cash-editor":
        UICtrl.editStateAddCash();
        break;
      case "display-mod-cash-editor":
        UICtrl.editStateModCash();
        break;
    }
  };

  const initConfig = function() {
    DataCtrl.addItem('Config', 'cash-onhand-need', { pennies: 1000 });
    DataCtrl.addItem('Config', 'cash-onhand-okay', { pennies: 2500 });
  };

  // App Public Methods
  // // init
  return {
    init: function() {
      let config;
      config = DataCtrl.getItems('Config');
      if (config.length === 0) {
        initConfig();
        config = DataCtrl.getItems('Config');
      }
      const items = DataCtrl.getItems('Cash');
      if (items.length === 0) {
        setAppState("display-new-cash-editor");
      } else {
        UICtrl.populateTrList(items);
        setAppState("hide-cash-editor");
      }
      UICtrl.showTotalAmount(
        DataCtrl.getTotalCents('Cash'),
        DataCtrl.getItemByName('Config', 'cash-onhand-need').obj.pennies,
        DataCtrl.getItemByName('Config', 'cash-onhand-okay').obj.pennies);
      loadEventListeners();
    }
  }
})(DataCtrl, UICtrl);

// :: BEGIN EXECUTION ::
App.init();