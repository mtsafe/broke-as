import { centsToDollars, centsToInputDollars, dollarsToCents } from './UI-Formats.mjs';

// UI CONTROLLER //
// controls the UI
class AcctUICtrl {
  constructor (componentPrefix) {
    // Component Prefix - set this value in the importer component
    for (var key in this.UIIds) {
      this.UIIds[key] = `#${componentPrefix}-${this.UIIds[key]}` ;
    }
  }
  UIIds = {
    editor: 'form-container',
    trList: 'tbody',
    trItems: 'tbody tr',
    addBtn: 'add-btn',
    backBtn: 'back-btn',
    deleteBtn: 'delete-btn',
    updateBtn: 'update-btn',
    addTrBtn: 'add-tr-btn',
    clearBtn: 'clear-all-btn',
    locationSelect: 'location-select',
    badge: 'badge',
    nameInput: 'name',
    amountInput: 'amount',
    dateInput: 'when',
    freqInput: 'frequency',
    endInput: 'ending',
    totalAmount: 'total-amount',
    assessmentModal: 'assessment-modal',
    modalAlert: 'modal-alert',
    modalOkay: 'modal-okay',
    modalNeed: 'modal-need'
  }

  // AcctUICtrl Public Methods
  // // populateTrList, getItemInput, addTrItem, deleteTrItem,
  // // updateTrItem, clearInput, putCurrentItemToForm, emptyTableBody,
  // // showTotalAmount, editStateOff, editStateAddCash, editStateModCash,
  // // getSelectors
  populateTrList(items, appType) {
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
    document.querySelector(this.UIIds.trList).innerHTML = html;
  }
  getItemInput(appType) {
    const amt = document.querySelector(this.UIIds.amountInput).value
    switch (appType) {
      case 'onHand':
        return {
          name: document.querySelector(this.UIIds.nameInput).value,
          pennies: parseInt(dollarsToCents(amt))
        }
        case 'recur':
          return {
            name: document.querySelector(this.UIIds.nameInput).value,
            pennies: parseInt(dollarsToCents(amt)),
            date: document.querySelector(this.UIIds.dateInput).value,
            freq: document.querySelector(this.UIIds.freqInput).value,
            ending: document.querySelector(this.UIIds.endInput).value
          }
    }
  }
  addTrItem(item, appType) {
    let tr = document.querySelector(this.UIIds.trList).insertRow(0);
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
  }
  deleteTrItem(id) {
    const trID = `#tr-${id}`;
    document.querySelector(trID).remove();
    let trItems = document.querySelectorAll(this.UIIds.trItems);
    trItems = Array.from(trItems);
    trItems.forEach(function(trItem) {
      if (trItem.id % 2 == 0) {
        trItem.classList.add("table-secondary");
      } else {
        trItem.classList.remove("table-secondary");
      }
    });
  }
  updateTrItem(item, appType) {
    let trItems = document.querySelectorAll(this.UIIds.trItems);
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
  }
  clearInput(appType) {
    document.querySelector(this.UIIds.nameInput).value = '';
    document.querySelector(this.UIIds.amountInput).value = '';
    switch (appType) {
      case 'onHand':
        return;
      case 'recur':
        document.querySelector(this.UIIds.dateInput).value = '';
        document.querySelector(this.UIIds.freqInput).value = '';
        document.querySelector(this.UIIds.endInput).value = '';
        return;
    }
  }
  setCashLocationSelector() {
  //  for each option in the selector,
  //  as it matches a tr in the table body,
  //  set the disable (true/false).
    const thList =
      Object.values(document.getElementsByClassName("tr-th-name"));
    const selectorOptions =
      Object.values(document.querySelector(this.UIIds.locationSelect).options);

    selectorOptions.forEach(option => { option.selected = false; });
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
    selectorOptions[0].selected = true;
  }
  putItemToForm(item, appType) {
    document.querySelector(this.UIIds.nameInput).value = item.name;
    document.querySelector(this.UIIds.amountInput).value =
      centsToInputDollars(item.obj.pennies);
    switch (appType) {
      case 'onHand':
        return;
      case 'recur':
        document.querySelector(this.UIIds.dateInput).value = item.obj.date;
        document.querySelector(this.UIIds.freqInput).value = item.obj.freq;
        document.querySelector(this.UIIds.endInput).value = item.obj.ending;
        return;
    }
  }
  emptyTableBody() {
    document.querySelector(this.UIIds.trList).innerHTML = "";
  }
  showTotalAmount(totalCents, needLevel, okayLevel) {
    document.querySelector(this.UIIds.totalAmount).textContent =
      centsToDollars(totalCents);

    const badge = document.querySelector(this.UIIds.badge);
    if (totalCents < needLevel) {
      badge.className = 'badge badge-pill badge-danger float-right';
      badge.textContent = 'Serious';
    } else if (totalCents < okayLevel) {
      document.querySelector(this.UIIds.badge).className =
      badge.className = 'badge badge-pill badge-warning float-right';
      badge.textContent = 'Need Cash';
    } else {
      document.querySelector(this.UIIds.badge).className =
      badge.className = 'badge badge-pill badge-success float-right';
      badge.textContent = 'Okay';
    }
  }
  editStateOff(appType) {
    this.clearInput(appType);
    document.querySelector(this.UIIds.addBtn).style.display = 'none';
    document.querySelector(this.UIIds.addTrBtn).style.display = 'inline-block';
    document.querySelector(this.UIIds.backBtn).style.display = 'none';
    document.querySelector(this.UIIds.deleteBtn).style.display = 'none';
    document.querySelector(this.UIIds.updateBtn).style.display = 'none';
    document.querySelector(this.UIIds.editor).style.display = 'none';
  }
  editStateAddCash() {
    this.setCashLocationSelector();
    document.querySelector(this.UIIds.editor).style.display = 'block';
    document.querySelector(this.UIIds.addBtn).style.display = 'inline-block';
    document.querySelector(this.UIIds.addTrBtn).style.display = 'none';
    document.querySelector(this.UIIds.backBtn).style.display = 'inline-block';
    document.querySelector(this.UIIds.deleteBtn).style.display = 'none';
    document.querySelector(this.UIIds.updateBtn).style.display = 'none';
  }
  editStateModCash() {
    this.setCashLocationSelector();
    document.querySelector(this.UIIds.editor).style.display = 'block';
    document.querySelector(this.UIIds.addBtn).style.display = 'none';
    document.querySelector(this.UIIds.addTrBtn).style.display = 'none';
    document.querySelector(this.UIIds.backBtn).style.display = 'inline-block';
    document.querySelector(this.UIIds.deleteBtn).style.display = 'inline-block';
    document.querySelector(this.UIIds.updateBtn).style.display = 'inline-block';
  }
  getSelectors() {
    return this.UIIds;
  }
};

export { AcctUICtrl };
