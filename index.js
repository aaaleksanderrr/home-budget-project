const formIncomes = document.getElementById("formIncomes");
const sumValueIncomes = document.getElementById("sumValueIncomes");
const nameIncome = document.getElementById("nameIncome");
const valueIncome = document.getElementById("valueIncome");

const formExpenses = document.getElementById("formExpenses");
const sumValueExpenses = document.getElementById("sumValueExpenses");
const nameExpense = document.getElementById("nameExpense");
const valueExpense = document.getElementById("valueExpense");

const info = document.getElementById("info");
const balance = document.getElementById("balance");

let displaySumValueIncomes = 0;
let displaySumValueExpenses = 0;

const hideTags = (array) => {
  array.forEach((element) => {
    element.className = "hidden";
  });
};

sumValueIncomes.innerText = displaySumValueIncomes;
sumValueExpenses.innerText = displaySumValueExpenses;

const validate = (input) => {
  if (input.id === "nameIncome" || input.id === "nameExpense" || input.id === "nameEdit") {
    input.addEventListener("invalid", () => {
      input.classList.add("invalid");
      input.setCustomValidity("To pole nie może być puste");
    });
  } else if (
    input.id === "valueIncome" ||
    input.id === "valueExpense" ||
    input.id === "valueEdit"
  ) {
    input.addEventListener("invalid", () => {
      input.classList.add("invalid");
      input.setCustomValidity("Kwota nie może być mniejsza niż 0.01 zł");
    });
  }
  input.addEventListener("input", () => {
    input.setCustomValidity("");
  });
};

validate(nameIncome);
validate(nameExpense);
validate(valueIncome);
validate(valueExpense);

const calculateBalance = (li, type, spanValue, editValueForm) => {
  if (li.id === "Income") {
    if (type === "Save") {
      if (editValueForm.value > Number(spanValue.innerText)) {
        displaySumValueIncomes += editValueForm.value - Number(spanValue.innerText);
        sumValueIncomes.innerText = displaySumValueIncomes;
      } else if (editValueForm.value < Number(spanValue.innerText)) {
        displaySumValueIncomes -= Number(spanValue.innerText) - editValueForm.value;
        sumValueIncomes.innerText = displaySumValueIncomes;
      }
    } else if (type === "Remove") {
      displaySumValueIncomes -= Number(spanValue.innerText);
      sumValueIncomes.innerText = displaySumValueIncomes;
    }
  } else if (li.id === "Expense") {
    if (type === "Save") {
      if (editValueForm.value > Number(spanValue.innerText)) {
        displaySumValueExpenses += editValueForm.value - Number(spanValue.innerText);
        sumValueExpenses.innerText = displaySumValueExpenses;
      } else if (editValueForm.value < Number(spanValue.innerText)) {
        displaySumValueExpenses -= Number(spanValue.innerText) - editValueForm.value;
        sumValueExpenses.innerText = displaySumValueExpenses;
      }
    } else if (type === "Remove") {
      displaySumValueExpenses -= Number(spanValue.innerText);
      sumValueExpenses.innerText = displaySumValueExpenses;
    }
  }
};

const updateBalance = () => {
  balance.className = "display-currency text-bold";
  if (displaySumValueIncomes - displaySumValueExpenses > 0) {
    info.innerText = "Możesz jeszcze wydać:";
    balance.innerText = displaySumValueIncomes - displaySumValueExpenses;
  } else if (displaySumValueIncomes - displaySumValueExpenses < 0) {
    info.innerText = "Bilans jest ujemny. Jesteś na minusie:";
    balance.innerText = displaySumValueExpenses - displaySumValueIncomes;
  } else if (displaySumValueIncomes - displaySumValueExpenses === 0) {
    info.innerText = "Bilans wynosi zero";
    balance.className = "hidden";
  }
};

const restoreButtons = (btnEdit, btnRemove, spanName, spanValue) => {
  btnEdit.classList.remove("hidden");
  btnRemove.classList.remove("hidden");
  spanName.className = "display-separator";
  spanValue.className = "display-currency text-bold";
};

const handleClick = (type) => {
  const li = document.createElement("li");
  li.id = type;
  document.querySelector(`#list${type}s`).appendChild(li);

  const divLi = document.createElement("div");
  divLi.className = "li-wrapper";

  const divItem = document.createElement("div");
  divItem.className = "item-wrapper";

  const spanName = document.createElement("span");
  spanName.innerText = String(document.querySelector(`#name${type}`).value);
  spanName.className = "display-separator";

  const spanValue = document.createElement("span");
  spanValue.innerText = document.querySelector(`#value${type}`).value;
  spanValue.className = "display-currency text-bold";

  if (type === "Income") {
    displaySumValueIncomes += Number(valueIncome.value);
    sumValueIncomes.innerText = displaySumValueIncomes;
  } else if (type === "Expense") {
    displaySumValueExpenses += Number(valueExpense.value);
    sumValueExpenses.innerText = displaySumValueExpenses;
  }

  const divButtons = document.createElement("div");
  divButtons.className = "button-wrapper";

  const btnEdit = document.createElement("button");
  btnEdit.innerText = "Edytuj";
  const btnRemove = document.createElement("button");
  btnRemove.innerText = "Usuń";

  li.appendChild(divLi);
  divItem.append(spanName, spanValue);
  divButtons.append(btnEdit, btnRemove);
  divLi.append(divItem, divButtons);

  updateBalance();

  const handleItemClick = (type) => {
    if (type === "Edit") {
      hideTags([spanName, spanValue, btnEdit, btnRemove]);

      const formEdit = document.createElement("form");
      formEdit.id = "formEdit";
      formEdit.className = "form";

      const saveBtn = document.createElement("button");
      saveBtn.type = "submit";
      saveBtn.innerText = "Zapisz";

      const cancelBtn = document.createElement("button");
      cancelBtn.innerText = "Anuluj";

      const editNameForm = document.createElement("input");
      editNameForm.type = "text";
      editNameForm.id = "nameEdit";
      editNameForm.className = "form-element-name";
      editNameForm.setAttribute("required", "");

      const editValueForm = document.createElement("input");
      editValueForm.type = "number";
      editValueForm.id = "valueEdit";
      editValueForm.className = "form-element-value";
      editValueForm.setAttribute("required", "");
      editValueForm.setAttribute("min", "0.01");
      editValueForm.setAttribute("step", "0.01");

      validate(editNameForm);
      validate(editValueForm);

      editNameForm.value = spanName.innerText;
      editValueForm.value = spanValue.innerText;

      formEdit.append(editNameForm, editValueForm, saveBtn, cancelBtn);
      divItem.appendChild(formEdit);

      const handleEditClick = (type) => {
        if (type === "Cancel") {
          formEdit.remove();
          restoreButtons(btnEdit, btnRemove, spanName, spanValue);
        } else if (type === "Save") {
          formEdit.remove();
          restoreButtons(btnEdit, btnRemove, spanName, spanValue);

          calculateBalance(li, type, spanValue, editValueForm);
          updateBalance();

          spanName.innerText = editNameForm.value;
          spanValue.innerText = editValueForm.value;
        }
      };

      cancelBtn.addEventListener("click", () => handleEditClick("Cancel"));
      formEdit.addEventListener("submit", (event) => {
        event.preventDefault();
        handleEditClick("Save");
      });
    }
    if (type === "Remove") {
      calculateBalance(li, type, spanValue);
      updateBalance();

      li.remove();
    }
  };

  btnEdit.addEventListener("click", () => handleItemClick("Edit"));
  btnRemove.addEventListener("click", () => handleItemClick("Remove"));
};

formIncomes.addEventListener("submit", (event) => {
  event.preventDefault();
  handleClick("Income");
});
formExpenses.addEventListener("submit", (event) => {
  event.preventDefault();
  handleClick("Expense");
});
