// Storage CONTROLLER //
// controls localStorage in the browser
const LocalStorageCtrl = (function() {
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
    updateItemStorage: function(itemListName, updatedItem) {
      let itemList = JSON.parse(localStorage.getItem(itemListName));
      itemList.forEach(function(item, index) {
        if (updatedItem.id === item.id) {
          itemList.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem(itemListName, JSON.stringify(itemList));
    }
  }
})();

export { LocalStorageCtrl };