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
// Storage CONTROLLER //
const StorageCtrl = (function() {
  // Public Methods
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
  const Item = function(id, name, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure / State
  const data = {
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0
  };

  // Public Methods
  return {
    getItems: function() {
      return data.items;
    },
    addItem: function(name, calories) {
      let ID = 0;
      if (data.items.length > 0) {          // Create ID
        ID = data.items[data.items.length - 1].id + 1;
      }
      calories = parseInt(calories);        // Calories to number
      newItem = new Item(ID, name, calories); // Create new item
      data.items.push(newItem);             // Add to items array
      return newItem;
    },
    getItemById: function(idNum) {
      return data.items[idNum];
    },
    updateItem: function(name, calories) {
      const item = data.items[data.currentItem.id];
      item.name = name;
      item.calories = parseInt(calories);
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
    getTotalCalories: function() {
      let total = 0;
      data.items.forEach(function(item) {
        total += item.calories;
      });
      data.totalCalories = total;
      return data.totalCalories;
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
    addBtn: '.add-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    deleteBtn: '.delete-btn',
    updateBtn: '.update-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  }

  // Public Methods
  return {
    populateItemList: function(items) {
      let html = '';
      items.forEach(function(item) {
        html += `<li class="collection-item" id="item-${item.id}">
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
        </li>`;
      });
      // Insert list Items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      }
    },
    addListItem: function(item) {
      document.querySelector(UISelectors.itemList).style.display = 'block';
      const li = document.createElement('li');  // Create li element
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories}
        Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
      document.querySelector(UISelectors.itemList).insertAdjacentElement(
        'beforeend', li);                 // Insert li element
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
          document.querySelector(`#${itemID}`).innerHTML =
          `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
        }
      });
    },
    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    addItemToForm: function() {
      document.querySelector(UISelectors.itemNameInput).value =
        ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value =
        ItemCtrl.getCurrentItem().calories;
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
    },
    showTotalCalories: function(totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent =
        totalCalories;
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
    if (input.name !== '' && input.calories !== '') {
      const newItem =
        ItemCtrl.addItem(input.name, input.calories); // Add item
      UICtrl.addListItem(newItem);
      UICtrl.showTotalCalories(ItemCtrl.getTotalCalories());
      StorageCtrl.storeItem(newItem);
      UICtrl.clearInput();
    }                           // Check for name and calorie input
    e.preventDefault();
  };

  // Update item submit
  const itemDeleteSubmit = function(e) {
    const currentItem = ItemCtrl.getCurrentItem();
    ItemCtrl.deleteItem(currentItem.id);
    UICtrl.deleteListItem(currentItem.id);
    UICtrl.showTotalCalories(ItemCtrl.getTotalCalories());
    StorageCtrl.deleteItemFromStorage(currentItem.id);
    UICtrl.clearEditState();
    e.preventDefault();
  };

  const itemUpdateSubmit = function(e) {
    const input = UICtrl.getItemInput();
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
    UICtrl.updateListItem(updatedItem);
    UICtrl.showTotalCalories(ItemCtrl.getTotalCalories());
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
    UICtrl.showTotalCalories(ItemCtrl.getTotalCalories());    
    UICtrl.removeItems();
    StorageCtrl.clearItemsFromStorage();
    UICtrl.hideList();
  }

  // Public Methods
  return {
    init: function() {
      UICtrl.clearEditState();              // Clear edit state
      const items = ItemCtrl.getItems();    // Fetch Items from data struc
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        UICtrl.populateItemList(items);
      }
      // Check if any items
      UICtrl.showTotalCalories(ItemCtrl.getTotalCalories());
      loadEventListeners();                 // Load event listeners
    }
  }
})(ItemCtrl, StorageCtrl, UICtrl);

App.init();