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
  // // clearAllItems, setCurrentItem, getCurrentItem, getTotalCents, logData
// UI CONTROLLER :: const UICtrl
  // Public Methods
  // // populateTrList, getItemInput, addTrItem, deleteTrItem,
  // // updateTrItem, clearInput, addItemToForm, emptyTableBody,
  // // showTotalAmount, clearEditState, showEditState, getSelectors
// App CONTROLLER :: const App = (function(DataCtrl, StorageCtrl, UICtrl) {
  // Public Methods
  // // init


// Storage CONTROLLER //
const StorageCtrl = (function() {
  // Public Methods
  // // flush, storeItem, getItemsFromStorage, updateItemStorage
  return {
    flush: function(items){
      localStorage.setItem('items', JSON.stringify(items));
    },
    storeItem: function(item) {
      let items;
      if (localStorage.getItem('items') === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      items.push(item);
      localStorage.setItem('items', JSON.stringify(items));
    },
    getItemsFromStorage: function() {
      let items;
      if (localStorage.getItem('items') === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
    updateItemStorage: function(updatedItem) {
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach(function(item, index) {
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    }
  }
})();

// Item CONTROLLER //
const DataCtrl = (function(StorageCtrl) {
  const Item = function(id, name, amount, dateTime){
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.dateTime = dateTime;
  };

  // Data Structure / State data
  const data = {
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalAmount: 0
  };

  // Public Methods
  // // getItems, enumerateItems, addItem, getItemById, updateItem, deleteItem,
  // // clearAllItems, setCurrentItem, getCurrentItem, getTotalCents, logData
  return {
    getItems: function() {
      return data.items;
    },
    enumerateItems: function() {
      let id = 0;
      data.items.forEach(function(item) {
        item.id = id;
        id++;
      });
      StorageCtrl.flush(data.items);
    },
    addItem: function(name, amount) {
      let ID = 0, dateTime="";
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      }
      amount = parseInt(amount);
      dateTime = timeConverter(Date.now());
      newItem = new Item(ID, name, amount, dateTime);
      data.items.push(newItem);
      StorageCtrl.storeItem(newItem);
      return newItem;
    },
    getItemById: function(idNum) {
      return data.items[idNum];
    },
    updateItem: function(name, amount) {
      const item = data.items[data.currentItem.id];
      item.name = name;
      item.amount = parseInt(amount);
      item.dateTime = timeConverter(Date.now());
      StorageCtrl.updateItemStorage(item);
      return item;
    },
    deleteItem: function(id) {
      const ids = data.items.map(function(item) {
        return item.id;
      });
      const index = ids.indexOf(id);
      data.items.splice(index, 1);
      DataCtrl.enumerateItems();
    },
    clearAllItems: function() {
      data.items = [];
      StorageCtrl.flush(data.items);
    },
    setCurrentItem: function(item) {
      data.currentItem = item;
    },
    getCurrentItem: function() {
      return data.currentItem;
    },
    getTotalCents: function() {
      let total = 0;
      data.items.forEach(function(item) {
        total += item.amount;
      });
      data.totalAmount = total;
      return data.totalAmount;
    },
    logData: function() {
      return data;
    }
  }
})(StorageCtrl);

// UI CONTROLLER //
const UICtrl = (function() {
  const UISelectors = {
    trList: '#cash-tbody',
    trItems: '#cash-tbody tr',
    addBtn: '#add-btn',
    backBtn: '#back-btn',
    clearBtn: '#clear-btn',
    deleteBtn: '#delete-btn',
    updateBtn: '#update-btn',
    itemNameInput: '#item-name',
    itemAmountInput: '#item-amount',
    totalAmount: '#total-amount'
  }

  // Public Methods
  // // populateTrList, getItemInput, addTrItem, deleteTrItem,
  // // updateTrItem, clearInput, addItemToForm, emptyTableBody,
  // // showTotalAmount, clearEditState, showEditState, getSelectors
  return {
    populateTrList: function(items) {
      let html = '', amt = 0, className='', id=0;
      items.forEach(function(item) {
        amt = item.amount / 100;
        if (id % 2 == 0) {
          className = 'table-secondary';
        } else {
          className = '';
        }
        html += `<tr class="${className}" id="tr-${id}">
        <th scope="row">${item.name}</th>
        <td>$<em>${amt.formatNum(2, 3, ',', '.')}</em></td>
        <td>${item.dateTime}
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a></td></tr>`;
        id++;
      });
      document.querySelector(UISelectors.trList).innerHTML = html;
    },
    getItemInput: function() {
      const amt = document.querySelector(UISelectors.itemAmountInput).value;
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        amount: amt.unformatInt(),
      }
    },
    addTrItem: function(item) {
      let tr = document.querySelector(UISelectors.trList).insertRow(0);
      if (item.id % 2 == 0) {
        tr.classList.add("table-secondary");
      }
      tr.id = `tr-${item.id}`;
      let amt = item.amount / 100;
      tr.innerHTML = `<th scope="row">${item.name}</th>
        <td>$<em>${amt.formatNum(2, 3, ',', '.')}</em></td>
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
          let amt = item.amount / 100;
          document.querySelector(`#${trID}`).innerHTML =
          `<th scope="row">${item.name}</th>
          <td>$<em>${amt.formatNum(2, 3, ',', '.')}</em></td>
          <td>${item.dateTime}
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a></td>`;  
          return;
        }
      });
    },
    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemAmountInput).value = '';
    },
    addItemToForm: function() {
      document.querySelector(UISelectors.itemNameInput).value =
        DataCtrl.getCurrentItem().name;
      let amt = DataCtrl.getCurrentItem().amount / 100;
      document.querySelector(UISelectors.itemAmountInput).value =
        amt.formatNum(2, 3, ',', '.');
      UICtrl.showEditState();
    },
    emptyTableBody: function() {
      document.querySelector(UISelectors.trList).innerHTML = "";
    },
    showTotalAmount: function(totalCents) {
      const amt = totalCents / 100;
      document.querySelector(UISelectors.totalAmount).textContent =
        amt.formatNum(2, 3, ',', '.');
    },
    clearEditState: function() {
      UICtrl.clearInput();
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
    },
    showEditState: function() {
      document.querySelector(UISelectors.addBtn).style.display = 'none';
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
    document.querySelector(UISelectors.addBtn).addEventListener(
      'click', itemAddSubmit);
    document.addEventListener('keypress', function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });
    document.querySelector(UISelectors.backBtn).addEventListener(
      'click', UICtrl.clearEditState);
    document.querySelector(UISelectors.clearBtn).addEventListener(
      'click', clearAllItemsClick);
    document.querySelector(UISelectors.deleteBtn).addEventListener(
      'click', itemDeleteSubmit);
    document.querySelector(UISelectors.trList).addEventListener(
      'click', itemEditClick);
    document.querySelector(UISelectors.updateBtn).addEventListener(
      'click', itemUpdateSubmit);
  };

  const itemAddSubmit = function(e) {
    const input = UICtrl.getItemInput();
    if (input.name !== '' && input.amount !== '') {
      const newItem =
        DataCtrl.addItem(input.name, input.amount);
      UICtrl.addTrItem(newItem);
      UICtrl.populateTrList(DataCtrl.getItems());
      UICtrl.showTotalAmount(DataCtrl.getTotalCents());
      UICtrl.clearInput();
    }
    e.preventDefault();
  };

  const itemDeleteSubmit = function(e) {
    const currentItem = DataCtrl.getCurrentItem();
    DataCtrl.deleteItem(currentItem.id);
    UICtrl.deleteTrItem(currentItem.id);
    UICtrl.populateTrList(DataCtrl.getItems());
    UICtrl.showTotalAmount(DataCtrl.getTotalCents());
    UICtrl.clearEditState();
    e.preventDefault();
  };

  const itemUpdateSubmit = function(e) {
    const input = UICtrl.getItemInput();
    const updatedItem = DataCtrl.updateItem(input.name, input.amount);
    UICtrl.updateTrItem(updatedItem);
    UICtrl.showTotalAmount(DataCtrl.getTotalCents());
    UICtrl.clearEditState();
    e.preventDefault();
  };

  const itemEditClick = function(e) {
    if (e.target.classList.contains('edit-item')) {
      const listId = e.target.parentNode.parentNode.parentNode.id;
      const listIdArr = listId.split('-');
      const id = parseInt(listIdArr[1]);
      const itemToEdit = DataCtrl.getItemById(id);
      DataCtrl.setCurrentItem(itemToEdit);
      UICtrl.addItemToForm();
    }

    e.preventDefault();
  };

  const clearAllItemsClick = function() {
    DataCtrl.clearAllItems();
    UICtrl.showTotalAmount(DataCtrl.getTotalCents());
    UICtrl.emptyTableBody();
  }

  // Public Methods
  // // init
  return {
    init: function() {
      UICtrl.clearEditState();
      const items = DataCtrl.getItems();
      if (items.length !== 0) {
        UICtrl.populateTrList(items);
      }
      UICtrl.showTotalAmount(DataCtrl.getTotalCents());
      loadEventListeners();
    }
  }
})(DataCtrl, UICtrl);

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

// Converts a string representation of float
// to number representation of minimum hundredths
// then times 100 and
// and returned as string representation of int
String.prototype.unformatInt = function() {
  let str = this.match(/\d+\.?\d*/);
  str = Number(str).toFixed(2);
  str = str.match(/\d/g).join("");
  return str
};

function timeConverter(timestamp){
  const a = new Date(timestamp);
  const months = ['Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'];
  fullDate = a.getDate() + ' ' + months[a.getMonth()] + ' ' + a.getFullYear();
  fullTime = a.getHours() + ':' + a.getMinutes() + ':' + a.getSeconds();
  return fullDate + ' ' + fullTime;
}

App.init();