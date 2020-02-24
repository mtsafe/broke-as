import { centsToDollars, dollarsToCents } from './UI-Formats.mjs';

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
    // Cash Accounts
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
    totalAmount: 'total-amount',
    assessmentModal: 'assessment-modal',
    modalAlert: 'modal-alert',
    modalOkay: 'modal-okay',
    modalNeed: 'modal-need'
    // Receivable Accounts
    // recvEditor: '#recv-form-container',
    // recvTrList: '#recv-tbody',
    // recvTrItems: '#recv-tbody tr',
    // recvAddBtn: '#recv-add-btn',
    // recvBackBtn: '#recv-back-btn',
    // recvDeleteBtn: '#recv-delete-btn',
    // recvUpdateBtn: '#recv-update-btn',
    // recvAddTrBtn: '#recv-add-tr-btn',
    // recvClearBtn: '#recv-clear-all-btn',
    // recvLocationSelect: '#recv-location-select',
    // recvBadge: '#recv-badge',
    // recvNameInput: '#recv-name',
    // recvAmountInput: '#recv-amount',
    // recvTotalAmount: '#recv-total-amount',
    // recvAssessmentModal: '#recv-assessment-modal',
    // recvModalAlert: '#recv-modal-alert',
    // recvModalOkay: '#recv-modal-okay',
    // recvModalNeed: '#recv-modal-need'
  }

  // AcctUICtrl Public Methods
  // // populateTrList, getItemInput, addTrItem, deleteTrItem,
  // // updateTrItem, clearInput, putCurrentItemToForm, emptyTableBody,
  // // showTotalAmount, editStateOff, editStateAddCash, editStateModCash,
  // // getSelectors
  populateTrList(items) {
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
  getItemInput() {
    const amt = document.querySelector(this.UIIds.amountInput).value;
    return {
      name: document.querySelector(this.UIIds.nameInput).value,
      pennies: parseInt(dollarsToCents(amt))
    }
  }
  addTrItem(item) {
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
  updateTrItem(item) {
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
  clearInput() {
    document.querySelector(this.UIIds.nameInput).value = '';
    document.querySelector(this.UIIds.amountInput).value = '';
  }
  setCashLocationSelector() {
  //  for each option in the selector,
  //  as it matches a tr in the table body,
  //  set the disable (true/false).
    const thList = 
      Object.values(document.getElementsByClassName("tr-th-name"));
    const selectorOptions =
      Object.values(document.querySelector(this.UIIds.locationSelect).options);

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
  }
  putItemToForm(item) {
    document.querySelector(this.UIIds.nameInput).value = item.name;
    document.querySelector(this.UIIds.amountInput).value =
      centsToDollars(item.obj.pennies);
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
  editStateOff() {
    this.clearInput();
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
