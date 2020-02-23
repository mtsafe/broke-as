// UI CONTROLLER //
// controls the UI
const UICtrl = (function() {
  const UISelectors = {
    // Cash Accounts
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
    modalNeed: '#modal-need',
    // Receivable Accounts
    recvEditor: '#recv-form-container',
    recvTrList: '#recv-tbody',
    recvTrItems: '#recv-tbody tr',
    recvAddBtn: '#recv-add-btn',
    recvBackBtn: '#recv-back-btn',
    recvDeleteBtn: '#recv-delete-btn',
    recvUpdateBtn: '#recv-update-btn',
    recvAddTrBtn: '#recv-add-tr-btn',
    recvClearBtn: '#recv-clear-all-btn',
    recvLocationSelect: '#recv-location-select',
    recvBadge: '#recv-badge',
    recvNameInput: '#recv-name',
    recvAmountInput: '#recv-amount',
    recvTotalAmount: '#recv-total-amount',
    recvAssessmentModal: '#recv-assessment-modal',
    recvModalAlert: '#recv-modal-alert',
    recvModalOkay: '#recv-modal-okay',
    recvModalNeed: '#recv-modal-need'
  }

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
        <td>$<em>${centsToDollars(item.obj.pennies)}</em></td>
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
        pennies: parseInt(dollarsToCents(amt))
      }
    },
    addTrItem: function(item) {
      let tr = document.querySelector(UISelectors.trList).insertRow(0);
      if (item.id % 2 == 0) {
        tr.classList.add("table-secondary");
      }
      tr.id = `tr-${item.id}`;
      tr.innerHTML = `<th class="tr-th-name" scope="row">${item.name}</th>
        <td>$<em>${centsToDollars(item.obj.pennies)}</em></td>
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
          <td>$<em>${centsToDollars(item.obj.pennies)}</em></td>
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
    putItemToForm: function(item) {
      document.querySelector(UISelectors.cashNameInput).value = item.name;
      document.querySelector(UISelectors.cashAmountInput).value =
        centsToDollars(item.obj.pennies);
    },
    emptyTableBody: function() {
      document.querySelector(UISelectors.trList).innerHTML = "";
    },
    showTotalAmount: function(totalCents, cashNeed, cashOkay) {
      document.querySelector(UISelectors.totalAmount).textContent =
        centsToDollars(totalCents);

      const badge = document.querySelector(UISelectors.cashBadge);
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
      document.querySelector(UISelectors.addTrBtn).style.display = 'inline-block';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.editor).style.display = 'none';
    },
    editStateAddCash: function() {
      UICtrl.setCashLocationSelector();
      document.querySelector(UISelectors.editor).style.display = 'block';
      document.querySelector(UISelectors.addBtn).style.display = 'inline-block';
      document.querySelector(UISelectors.addTrBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'inline-block';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
    },
    editStateModCash: function() {
      UICtrl.setCashLocationSelector();
      document.querySelector(UISelectors.editor).style.display = 'block';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
      document.querySelector(UISelectors.addTrBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'inline-block';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline-block';
      document.querySelector(UISelectors.updateBtn).style.display = 'inline-block';
    },
    getSelectors: function() {
      return UISelectors;
    }
  }
})();

export { UICtrl };
