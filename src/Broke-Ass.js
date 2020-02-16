// This project uses the Module Pattern

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
  // // storeItem, getItemsFromStorage, updateItemStorage
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


// Storage CONTROLLER //
// controls localStorage in the browser
const StorageCtrl = (function() {
  // StorageCtrl Public Methods
  // // flush, storeItem, getItemsFromStorage, updateItemStorage
  return {
    flush: function(itemListName, itemList){
      localStorage.setItem(itemListName, JSON.stringify(itemList));
    },
    storeItem: function(itemListName, item) {
      let itemList;
      if (localStorage.getItem(itemListName) === null) {
        itemList = [];
      } else {
        itemList = JSON.parse(localStorage.getItem(itemListName));
      }
      itemList.push(item);
      localStorage.setItem(itemListName, JSON.stringify(itemList));
    },
    getItemsFromStorage: function(itemListName) {
      let itemList;
      if (localStorage.getItem(itemListName) === null) {
        itemList = [];
      } else {
        itemList = JSON.parse(localStorage.getItem(itemListName));
      }
      return itemList;
    },
    updateItemStorage: function(itemListName, updateItem) {
      let itemList = JSON.parse(localStorage.getItem(itemListName));
      itemList.forEach(function(item, index) {
        if (updateItem.id === item.id) {
          itemList.splice(index, 1, updateItem);
        }
      });
      localStorage.setItem(itemListName, JSON.stringify(itemList));
    }
  }
})();

// Item CONTROLLER //
// acts like a middleware interface to localStorage and/or other storage
const DataCtrl = (function(StorageCtrl) {
  const Item = function(id, name, value, dateTime){
    this.id = id;
    this.name = name;
    this.value = value;
    this.dateTime = dateTime;
  };

  // Data Structure / State data in browser memory for the page
  const data = {
    Cash: StorageCtrl.getItemsFromStorage('Cash'),
    Config: StorageCtrl.getItemsFromStorage('Config'),
    currentItem: { Cash: null, Config: null },
    totalAmount: 0
  };

  // Public Methods
  // // getItems, enumerateItems, addItem, getItemById, updateItem, deleteItem,
  // // clearAllItems, setCurrentItem, getCurrentItem, getTotalCents
  return {
    getItems: function(dataStore) {
      return data[dataStore];
    },
    enumerateItems: function(dataStore) {
      let id = 0;
      data[dataStore].forEach(function(item) {
        item.id = id;
        id++;
      });
      StorageCtrl.flush(dataStore, data[dataStore]);
    },
    addItem: function(dataStore, name, value) {
      let ID = 0, dateTime="";
      if (data[dataStore].length > 0) {
        ID = data[dataStore][data[dataStore].length - 1].id + 1;
      }
      value = parseInt(value);
      dateTime = timeConverter(Date.now());
      newItem = new Item(ID, name, value, dateTime);
      data[dataStore].push(newItem);
      StorageCtrl.storeItem(dataStore, newItem);
      return newItem;
    },
    getItemById: function(dataStore, idNum) {
      return data[dataStore][idNum];
    },
    getItemByName: function(dataStore, matchName) {
      return data[dataStore].find((item) => {
        return item.name === matchName;
      });
    },
    updateItem: function(dataStore, name, value) {
      const item = data[dataStore][data.currentItem[dataStore].id];
      item.name = name;
      item.value = parseInt(value);
      item.dateTime = timeConverter(Date.now());
      StorageCtrl.updateItemStorage(dataStore, item);
      return item;
    },
    deleteItem: function(dataStore, id) {
      const ids = data[dataStore].map(function(item) {
        return item.id;
      });
      const index = ids.indexOf(id);
      data[dataStore].splice(index, 1);
      DataCtrl.enumerateItems(dataStore);
    },
    clearAllItems: function(dataStore) {
      data[dataStore] = [];
      StorageCtrl.flush(dataStore, data[dataStore]);
    },
    setCurrentItem: function(dataStore, item) {
      data.currentItem[dataStore] = item;
    },
    getCurrentItem: function(dataStore) {
      return data.currentItem[dataStore];
    },
    getTotalCents: function(dataStore) {
      let total = 0;
      data[dataStore].forEach(function(item) {
        total += item.value;
      });
      data.totalAmount = total;
      return data.totalAmount;
    }
  }
})(StorageCtrl);

// UI CONTROLLER //
// controls the UI
const UICtrl = (function() {
  const UISelectors = {
    editor: '#cash-form-container',
    trList: '#cash-tbody',
    trItems: '#cash-tbody tr',
    addBtn: '#add-btn',
    backBtn: '#back-btn',
    deleteBtn: '#delete-btn',
    updateBtn: '#update-btn',
    addTrBtn: '#add-tr-btn',
    clearBtn: '#clear-all-btn',
    locationSelect: '#location-select',
    cashBadge: '#cash-badge',
    cashNameInput: '#cash-name',
    cashAmountInput: '#cash-amount',
    totalAmount: '#total-amount',
    cashAssessmentModal: '#cash-assessment-modal',
    cashModalAlert: '#cash-modal-alert',
    modalOkay: '#modal-okay',
    modalNeed: '#modal-need'
}

  // UICtrl Public Methods
  // // populateTrList, getItemInput, addTrItem, deleteTrItem,
  // // updateTrItem, clearInput, putCurrentItemToForm, emptyTableBody,
  // // showTotalAmount, editStateOff, editStateAddCash, editStateModCash,
  // // getSelectors
  return {
    populateTrList: function(items) {
      let html = '', className='', id=0;
      items.forEach(function(item) {
        if (id % 2 == 0) {
          className = 'table-secondary';
        } else {
          className = '';
        }
        html += `<tr class="${className}" id="tr-${id}">
        <th class="tr-th-name" scope="row">${item.name}</th>
        <td>$<em>${centsToDollars(item.value)}</em></td>
        <td>${item.dateTime}
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a></td></tr>`;
        id++;
      });
      document.querySelector(UISelectors.trList).innerHTML = html;
    },
    getItemInput: function() {
      const amt = document.querySelector(UISelectors.cashAmountInput).value;
      return {
        name: document.querySelector(UISelectors.cashNameInput).value,
        value: dollarsToCents(amt),
      }
    },
    addTrItem: function(item) {
      let tr = document.querySelector(UISelectors.trList).insertRow(0);
      if (item.id % 2 == 0) {
        tr.classList.add("table-secondary");
      }
      tr.id = `tr-${item.id}`;
      tr.innerHTML = `<th class="tr-th-name" scope="row">${item.name}</th>
        <td>$<em>${centsToDollars(item.value)}</em></td>
        <td>${item.dateTime}
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a></td>`;
    },
    deleteTrItem: function(id) {
      const trID = `#tr-${id}`;
      document.querySelector(trID).remove();
      let trItems = document.querySelectorAll(UISelectors.trItems);
      trItems = Array.from(trItems);
      trItems.forEach(function(trItem) {
        if (trItem.id % 2 == 0) {
          trItem.classList.add("table-secondary");
        } else {
          trItem.classList.remove("table-secondary");
        }
      });
    },
    updateTrItem: function(item) {
      let trItems = document.querySelectorAll(UISelectors.trItems);
      trItems = Array.from(trItems);
      trItems.forEach(function(trItem) {
        const trID = trItem.getAttribute('id');
        if (trID === `tr-${item.id}`) {
          document.querySelector(`#${trID}`).innerHTML =
          `<th class="tr-th-name" scope="row">${item.name}</th>
          <td>$<em>${centsToDollars(item.value)}</em></td>
          <td>${item.dateTime}
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a></td>`;  
          return;
        }
      });
    },
    clearInput: function() {
      document.querySelector(UISelectors.cashNameInput).value = '';
      document.querySelector(UISelectors.cashAmountInput).value = '';
    },
    setCashLocationSelector: function() {
    //  for each option in the selector,
    //  as it matches a tr in the table body,
    //  set the disable (true/false).
      const thList = 
        Object.values(document.getElementsByClassName("tr-th-name"));
      const selectorOptions =
        Object.values(document.querySelector('#location-select').options);

      selectorOptions.forEach(option => { option.disabled = false; });

      selectorOptions.forEach((option, index) => {
        thList.forEach( th => {
          if (index === 0) {
            return;
          }
          if (option.value.toUpperCase() === th.innerHTML.toUpperCase()) {
            option.disabled = true;
          }
        });
      });
    },
    putCurrentItemToForm: function() {
      document.querySelector(UISelectors.cashNameInput).value =
        DataCtrl.getCurrentItem('Cash').name;
      const amt = centsToDollars(DataCtrl.getCurrentItem('Cash').value);
      document.querySelector(UISelectors.cashAmountInput).value = amt;
    },
    emptyTableBody: function() {
      document.querySelector(UISelectors.trList).innerHTML = "";
    },
    showTotalAmount: function(totalCents) {
      document.querySelector(UISelectors.totalAmount).textContent =
        centsToDollars(totalCents);
      const badge = document.querySelector(UISelectors.cashBadge);
      const cashNeed = DataCtrl.getItemByName('Config',
        'cash-onhand-need').value;
      const cashOkay = DataCtrl.getItemByName('Config',
        'cash-onhand-okay').value;

      if (totalCents < cashNeed) {
        badge.className = 'badge badge-pill badge-danger float-right';
        badge.textContent = 'Serious';
      } else if (totalCents < cashOkay) {
        document.querySelector(UISelectors.cashBadge).className =
        badge.className = 'badge badge-pill badge-warning float-right';
        badge.textContent = 'Need Cash';
      } else {
        document.querySelector(UISelectors.cashBadge).className =
        badge.className = 'badge badge-pill badge-success float-right';
        badge.textContent = 'Okay';
      }
    },
    editStateOff: function() {
      UICtrl.clearInput();
      document.querySelector(UISelectors.addBtn).style.display = 'none';
      document.querySelector(UISelectors.addTrBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.editor).style.display = 'none';
    },
    editStateAddCash: function() {
      UICtrl.setCashLocationSelector();
      document.querySelector(UISelectors.editor).style.display = 'block';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
      document.querySelector(UISelectors.addTrBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
    },
    editStateModCash: function() {
      UICtrl.setCashLocationSelector();
      document.querySelector(UISelectors.editor).style.display = 'block';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
      document.querySelector(UISelectors.addTrBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
    },
    getSelectors: function() {
      return UISelectors;
    }
  }
})();

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
        'cash-onhand-need').value / 100);
      document.querySelector(UISelectors.modalNeed).value = amt;
      amt = parseInt(DataCtrl.getItemByName('Config',
        'cash-onhand-okay').value / 100);
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
      DataCtrl.updateItem(dataStore, param, amtNeed + '00');

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
      DataCtrl.updateItem(dataStore, param, amtOkay + '00');

      UICtrl.showTotalAmount(DataCtrl.getTotalCents('Cash'));
    });
    $(UISelectors.cashModalAlert).on('close.bs.alert', function (e) {
      const modalAlert = document.querySelector(UISelectors.cashModalAlert);
      modalAlert.classList = "";
      modalAlert.innerHTML = "";
      e.preventDefault();
    });
  };

  const addBtnClick = function(e) {
    const input = UICtrl.getItemInput();
    if (input.name !== '' && input.value !== '') {
      const newItem =
        DataCtrl.addItem('Cash', input.name, input.value);
      UICtrl.addTrItem(newItem);
      UICtrl.populateTrList(DataCtrl.getItems('Cash'));
      UICtrl.showTotalAmount(DataCtrl.getTotalCents('Cash'));
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
    UICtrl.showTotalAmount(DataCtrl.getTotalCents('Cash'));
    setAppState("hide-cash-editor");
    e.preventDefault();
  };

  const updateBtnClick = function(e) {
    const input = UICtrl.getItemInput();
    const updatedItem = DataCtrl.updateItem('Cash', input.name, input.value);
    UICtrl.updateTrItem(updatedItem);
    UICtrl.showTotalAmount(DataCtrl.getTotalCents('Cash'));
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
      UICtrl.putCurrentItemToForm();
      setAppState("display-mod-cash-editor");
    }
    e.preventDefault();
  };

  const clearAllItemsBtnClick = function() {
    DataCtrl.clearAllItems('Cash');
    UICtrl.showTotalAmount(DataCtrl.getTotalCents('Cash'));
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
    DataCtrl.addItem('Config', 'cash-onhand-need', 1000);
    DataCtrl.addItem('Config', 'cash-onhand-okay', 2500);
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
      UICtrl.showTotalAmount(DataCtrl.getTotalCents('Cash'));
      loadEventListeners();
    }
  }
})(DataCtrl, UICtrl);

// :: GLOBAL FUNCTIONS ::
/**
 * Number.prototype.formatNum(n, x, s, c)
 *  (converts a number to a string)
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 * 
 * Samples:
 * 12345678.9.formatNum(2, 3, '.', ',');  // "12.345.678,90"
 * 123456.789.formatNum(4, 4, ' ', ':');  // "12 3456:7890"
 * 12345678.9.formatNum(0, 3, '-');       // "12-345-679"
 */
Number.prototype.formatNum = function(n, x, s, c) {
  const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
      num = this.toFixed(Math.max(0, ~~n));

  return (c ? num.replace('.', c) : num).replace(
    new RegExp(re, 'g'), '$&' + (s || ','));
};

// Converts a number representation of int cents
// to a string representation of float dollars.
function centsToDollars(amt) {
  let x = amt / 100;
  return x.formatNum(2, 3, ',', '.');
};

// Converts a string representation of float dollars
// to a string representation of int cents.
function dollarsToCents(amt) {
  let str = amt.match(/\d+\.?\d*/);
  str = Number(str).toFixed(2);
  return str.match(/\d/g).join("");
};

function timeConverter(timestamp){
  const a = new Date(timestamp);
  const months = ['Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'];
  fullDate = `${a.getDate()} ${months[a.getMonth()]} ${a.getFullYear()}`;
  let hr = a.getHours(), am_pm = "";
  if (hr > 12) {
    hr -= 12;
    am_pm = "pm";
  } else if (hr == 12) {
    am_pm = "pm";
  } else if (hr > 0) {
    am_pm = "am";
  } else {
    hr = 12;
    am_pm = "am";
  }
  hr = leadingZero(hr);
  const mn = leadingZero(a.getMinutes());
  const sc = leadingZero(a.getSeconds());
  return `${fullDate} ${hr}:${mn}:${sc} ${am_pm}`;
}

function leadingZero(n) {
  return (n < 10 ? '0' : '') + n.toString();
}

// :: BEGIN EXECUTION ::
App.init();