import { LocalStorageCtrl as StorageCtrl } from './LocalStorage.mjs';

// Item CONTROLLER //
// acts like a middleware interface to localStorage and/or other storage
const DataCtrl = (function(StorageCtrl) {
  // id, name, and dateTime are part of the wrapper
  // for controlling the data within the obj variable.
  // Note: currency values will be stored as integer in obj.pennies .
  const Item = function(id, name, obj, dateTime){
    this.id = id;
    this.name = name;
    this.obj = obj;
    this.dateTime = dateTime;
  };

  // Data Structure / State data in browser memory for the page
  const data = {
    currentItem: {}
  };
  // const data = {
  //   Config: StorageCtrl.getItemsFromStorage('Config'),
  //   Cash: StorageCtrl.getItemsFromStorage('Cash'),
  //   currentItem: { Cash: null, Config: null }
  // };

  function leadingZero(n) {
    return (n < 10 ? '0' : '') + n.toString();
  }

  function timeConverter(timestamp){
    const a = new Date(timestamp);
    const months = ['Jan','Feb','Mar','Apr','May','Jun',
      'Jul','Aug','Sep','Oct','Nov','Dec'];
    let fullDate = `${a.getDate()} ${months[a.getMonth()]} ${a.getFullYear()}`;
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
  
  // DataCtrl Public Methods ::
  //    Note: all these functions work on a specific dataStore
  // enumerateItems() - enumerates the ids for items items in the data global,
  //    then updates local storage
  // clearAllItems() - empties the data global, then updates local storage
  // setCurrentItem() - sets the currentItem global to a given item
  // getCurrentItem() - gets the currentItem global item
  // initItems() - gets the full item list from local storage,
  //    then syncs the global data the retrieved data,
  //    then the currentItem global is set to null
  // getItems() - returns the full item list from local storage
  // getItemById() - returns an item from global data by id
  // getItemByName() - returns the first matching item from global data by name
  // addItem() - sets the id number to be appended,
  //    then sets dateTime to now,
  //    then creates an object for the item,
  //    then pushes it to data global and local storage
  //    then it returns the new item
  // updateItem() - gets the currentItem global item,
  //    then modifies that item in the data global,
  //    then updates the item in local storage,
  //    then returns the item
  // deleteItem() - removes the item from the data global that matches the id,
  //    then enumerates the items into local storage
  // getTotalCents() - returns the summation of obj.pennies
  return {
    enumerateItems: function(dataStore) {
      let id = 0;
      data[dataStore].forEach(function(item) {
        item.id = id;
        id++;
      });
      StorageCtrl.flush(dataStore, data[dataStore]);
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
    initItems: function(dataStore) {
      data[dataStore] = StorageCtrl.getItemsFromStorage(dataStore);
      if (data[dataStore] === undefined) {
        this.clearAllItems(dataStore);
      }
      this.setCurrentItem(dataStore, null);
    },
    getItems: function(dataStore) {
      this.initItems(dataStore);
      return data[dataStore];
    },
    getItemById: function(dataStore, idNum) {
      return data[dataStore][idNum];
    },
    getItemByName: function(dataStore, matchName) {
      return data[dataStore].find((item) => {
        return item.name === matchName;
      });
    },
    addItem: function(dataStore, name, obj) {
      this.initItems(dataStore);
      let ID = 0, dateTime="", newItem=null;
      if (data[dataStore].length > 0) {
        ID = data[dataStore][data[dataStore].length - 1].id + 1;
      }
      dateTime = timeConverter(Date.now());
      newItem = new Item(ID, name, obj, dateTime);
      data[dataStore].push(newItem);
      StorageCtrl.storeItem(dataStore, newItem);
      return newItem;
    },
    updateItem: function(dataStore, name, obj) {
      const item = DataCtrl.getCurrentItem(dataStore);
      item.name = name;
      item.obj = obj;
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
    // getTotalCents needs obj.pennies as number type
    getTotalCents: function(dataStore) {
      let total = 0;
      data[dataStore].forEach(function(item) {
        total += item.obj.pennies;
      });
      return total;
    }
  }
})(StorageCtrl);


export { DataCtrl };
