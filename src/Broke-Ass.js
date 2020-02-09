// This project uses the Module Pattern

// The Module pattern and the Revealing Module pattern
// This pattern was being used in ES5.
// ES6 introduced actual modules in javascript.
// This means that you can use separate files to export modules
// which are custom pieces of code and import them into a new file.
// Modules have private variables and functions.
// However, this is still not supported in browsers (as of 2017),
// and you have to use a compiler like Babel along with a module loader
// like WebPack for that to work.

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
  // // storeItem, getItemsFromStorage, updateItemStorage,
  // // deleteItemFromStorage, clearItemsFromStorage
// Item CONTROLLER :: const ItemCtrl
  // Public Methods
  // // getItems, addItem, getItemById, updateItem, deleteItem,
  // // clearAllItems, setCurrentItem, getCurrentItem, getTotalCents, logData
// UI CONTROLLER :: const UICtrl
  // Public Methods
  // // populateItemList, getItemInput, addListItem, deleteListItem,
  // // updateListItem, clearInput, addItemToForm, removeItems, hideList,
  // // showTotalAmount, clearEditState, showEditState, getSelectors
// App CONTROLLER :: const App = (function(ItemCtrl, StorageCtrl, UICtrl) {
  // Public Methods
  // // init


// Storage CONTROLLER //
const StorageCtrl = (function() {
  // Public Methods
  // // storeItem, getItemsFromStorage, updateItemStorage
  // // deleteItemFromStorage, clearItemsFromStorage
  return {
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
    },
    deleteItemFromStorage: function(id) {
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach(function(item, index) {
        if (id === item.id) {
          items.splice(index, 1);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    clearItemsFromStorage: function() {
      localStorage.removeItem('items');
    }
  }
})();

// Item CONTROLLER //
const ItemCtrl = (function() {
  const Item = function(id, name, amount){
    this.id = id;
    this.name = name;
    this.amount = amount;
  };

  // Data Structure / State
  const data = {
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalAmount: 0
  };

  // Public Methods
  // // getItems, addItem, getItemById, updateItem, deleteItem,
  // // clearAllItems, setCurrentItem, getCurrentItem, getTotalCents, logData
  return {
    getItems: function() {
      return data.items;
    },
    addItem: function(name, amount) {
      let ID = 0;
      if (data.items.length > 0) {          // Create ID
        ID = data.items[data.items.length - 1].id + 1;
      }
      amount = parseInt(amount);        // Amount to number
      newItem = new Item(ID, name, amount); // Create new item
      data.items.push(newItem);             // Add to items array
      return newItem;
    },
    getItemById: function(idNum) {
      return data.items[idNum];
    },
    updateItem: function(name, amount) {
      const item = data.items[data.currentItem.id];
      item.name = name;
      item.amount = parseInt(amount);
      return item;
    },
    deleteItem: function(id) {
      const ids = data.items.map(function(item) {
        return item.id;
      });
      const index = ids.indexOf(id);
      data.items.splice(index, 1);
    },
    clearAllItems: function() {
      data.items = [];
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
})();

// UI CONTROLLER //
const UICtrl = (function() {
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    trList: '#cash-account-table',
    trItems: '#cash-account-table tr',
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
  // // populateItemList, getItemInput, addListItem, deleteListItem,
  // // updateListItem, clearInput, addItemToForm, removeItems, hideList,
  // // showTotalAmount, clearEditState, showEditState, getSelectors
  return {
    populateItemList: function(items) {
      let html = '', amt = 0;
      items.forEach(function(item) {
        amt = item.amount / 100;
        html += `<li class="collection-item" id="item-${item.id}">
          <strong>${item.name}: </strong>
          $<em>${amt.formatInt(2, 3, ',', '.')}</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
        </li>`;
      });
      // Insert list Items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    populateTrList: function(items) {
      let html = '', amt = 0;
      items.forEach(function(item) {
        amt = item.amount / 100;
        html += `<tr class="table-secondary" id="tr-${item.id}">
        <th scope="row">${item.name}</th>
        <td>$<em>${amt.formatInt(2, 3, ',', '.')}</em></td>
        <td>Column content
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a></td></tr>`;
      });
      // Insert list Items
      document.querySelector(UISelectors.trList).innerHTML = html;
    },
    getItemInput: function() {
      const amt = document.querySelector(UISelectors.itemAmountInput).value;
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        amount: amt.unformatInt(),
      }
    },
    addListItem: function(item) {
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // Insert list item element
      const li = document.createElement('li');  // Create li element
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      let amt = item.amount / 100;
      li.innerHTML = `<strong>${item.name}: </strong>
      $<em>${amt.formatInt(2, 3, ',', '.')}</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
      document.querySelector(UISelectors.itemList).insertAdjacentElement(
        'beforeend', li);                 // Insert li element
      // document.querySelector(UISelectors.trList).style.display = 'block';
      // Insert table row element
      const tr = document.createElement('tr');  // Create tr element
      tr.className = 'table-secondary';
      tr.id = `tr-${item.id}`;
      // let
              amt = item.amount / 100;
      tr.innerHTML = `<th scope="row">${item.name}</th>
        <td>$<em>${amt.formatInt(2, 3, ',', '.')}</em></td>
        <td>Column content
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a></td>`;
      document.querySelector(UISelectors.trList).insertAdjacentElement(
        'beforeend', tr);                 // Insert tr element
    },
    deleteListItem: function(id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    updateListItem: function(item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      listItems = Array.from(listItems);  // Turn node list into array
      listItems.forEach(function(listItem) {
        const itemID = listItem.getAttribute('id');
        if (itemID === `item-${item.id}`) {
          let amt = item.amount / 100;
          document.querySelector(`#${itemID}`).innerHTML =
          `<strong>${item.name}: </strong>
          $<em>${amt.formatInt(2, 3, ',', '.')} </em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
        }
      });
    },
    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemAmountInput).value = '';
    },
    addItemToForm: function() {
      document.querySelector(UISelectors.itemNameInput).value =
        ItemCtrl.getCurrentItem().name;
      let amt = ItemCtrl.getCurrentItem().amount / 100;
      document.querySelector(UISelectors.itemAmountInput).value =
        amt.formatInt(2, 3, ',', '.');
      UICtrl.showEditState();
    },
    removeItems: function() {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      listItems = Array.from(listItems);
      listItems.forEach(function(item) {
        item.remove();
      });
    },
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = 'none';
      document.querySelector(UISelectors.trList).style.display = 'none';
    },
    showTotalAmount: function(totalCents) {
      const amt = totalCents / 100;
      document.querySelector(UISelectors.totalAmount).textContent =
        amt.formatInt(2, 3, ',', '.');
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
const App = (function(ItemCtrl, StorageCtrl, UICtrl) {
  // Load event listeners
  const loadEventListeners = function() {
    const UISelectors = UICtrl.getSelectors();
    document.querySelector(UISelectors.addBtn).addEventListener(
      'click', itemAddSubmit);        // Add item event
    document.addEventListener('keypress', function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });                               // Disable submit on Enter key
    document.querySelector(UISelectors.backBtn).addEventListener(
      'click', UICtrl.clearEditState);       // Back item event
    document.querySelector(UISelectors.clearBtn).addEventListener(
      'click', clearAllItemsClick);   // Clear items event
    document.querySelector(UISelectors.deleteBtn).addEventListener(
      'click', itemDeleteSubmit);     // Delete item event
    document.querySelector(UISelectors.itemList).addEventListener(
      'click', itemEditClick);        // Edit item click event
    document.querySelector(UISelectors.updateBtn).addEventListener(
      'click', itemUpdateSubmit);     // Update item event
  };

  // Add item submit
  const itemAddSubmit = function(e) {
    const input = UICtrl.getItemInput();  // Get form input form UI Controller
    if (input.name !== '' && input.amount !== '') {
      const newItem =
        ItemCtrl.addItem(input.name, input.amount); // Add item
      UICtrl.addListItem(newItem);
      UICtrl.showTotalAmount(ItemCtrl.getTotalCents());
      StorageCtrl.storeItem(newItem);
      UICtrl.clearInput();
    }                           // Check for name and calorie input
    e.preventDefault();
  };

  // Delete item submit
  const itemDeleteSubmit = function(e) {
    const currentItem = ItemCtrl.getCurrentItem();
    ItemCtrl.deleteItem(currentItem.id);
    UICtrl.deleteListItem(currentItem.id);
    UICtrl.showTotalAmount(ItemCtrl.getTotalCents());
    StorageCtrl.deleteItemFromStorage(currentItem.id);
    UICtrl.clearEditState();
    e.preventDefault();
  };

  // Update item submit
  const itemUpdateSubmit = function(e) {
    const input = UICtrl.getItemInput();
    const updatedItem = ItemCtrl.updateItem(input.name, input.amount);
    UICtrl.updateListItem(updatedItem);
    UICtrl.showTotalAmount(ItemCtrl.getTotalCents());
    StorageCtrl.updateItemStorage(updatedItem);
    UICtrl.clearEditState();
    e.preventDefault();
  };

  // Click edit item
  const itemEditClick = function(e) {
    if (e.target.classList.contains('edit-item')) {
      const listId = e.target.parentNode.parentNode.id;  // Get list item id
      const listIdArr = listId.split('-');    // Break into an array
      const id = parseInt(listIdArr[1]);      // Get id number
      const itemToEdit = ItemCtrl.getItemById(id);  // Get item
      ItemCtrl.setCurrentItem(itemToEdit);    // Set current item
      UICtrl.addItemToForm();                 // Add item to form
    }

    e.preventDefault();
  };

  // Clear Items event
  const clearAllItemsClick = function() {
    ItemCtrl.clearAllItems();
    UICtrl.showTotalAmount(ItemCtrl.getTotalCents());    
    UICtrl.removeItems();
    StorageCtrl.clearItemsFromStorage();
    UICtrl.hideList();
  }

  // Public Methods
  // // init
  return {
    init: function() {
      UICtrl.clearEditState();              // Clear edit state
      const items = ItemCtrl.getItems();    // Fetch Items from data struc
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        UICtrl.populateItemList(items);
        UICtrl.populateTrList(items);
      }
      // Check if any items
      UICtrl.showTotalAmount(ItemCtrl.getTotalCents());
      loadEventListeners();                 // Load event listeners
    }
  }
})(ItemCtrl, StorageCtrl, UICtrl);

/**
 * Number.prototype.format(n, x, s, c)
 * 
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 * 
 * Samples:
 * 12345678.9.formatInt(2, 3, '.', ',');  // "12.345.678,90"
 * 123456.789.formatInt(4, 4, ' ', ':');  // "12 3456:7890"
 * 12345678.9.formatInt(0, 3, '-');       // "12-345-679"
 */
Number.prototype.formatInt = function(n, x, s, c) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
      num = this.toFixed(Math.max(0, ~~n));

  return (c ? num.replace('.', c) : num).replace(
    new RegExp(re, 'g'), '$&' + (s || ','));
};

String.prototype.unformatInt = function() {
  let str = this.match(/\d+\.?\d*/);
  str = Number(str).toFixed(2);
  str = str.match(/\d/g).join("");
  return str
};

App.init();
