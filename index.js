const nameIncome = document.getElementById("nameIncome");
const valueIncome = document.getElementById("valueIncome");
const btnAddIncome = document.getElementById("btnAddIncome");
const sumValueIncomes = document.getElementById("sumValueIncomes");
const listIncomes = document.getElementById("listIncomes");

const nameExpense = document.getElementById("nameExpense");
const valueExpense = document.getElementById("valueExpense");
const btnAddExpense = document.getElementById("btnAddExpense");
const sumValueExpenses = document.getElementById("sumValueExpenses");
const listExpenses = document.getElementById("listExpenses");

let displaySumValueIncomes = 0;
let displaySumValueExpenses = 0;

const applyClass = (array, className) => {
  array.forEach((element) => {
    element.className = className;
  });
};

const removeTags = (array) => {
  array.forEach((element) => {
    element.remove();
  });
};

sumValueIncomes.innerText = displaySumValueIncomes;
sumValueExpenses.innerText = displaySumValueExpenses;

const handleClick = (type) => {
  const li = document.createElement("li");
  type === "Income" ? listIncomes.appendChild(li) : listExpenses.appendChild(li);

  const divLi = document.createElement("div");
  divLi.className = "li-wrapper";

  const divItem = document.createElement("div");
  divItem.className = "item-wrapper";

  const spanName = document.createElement("span");
  type === "Income"
    ? (spanName.innerText = nameIncome.value)
    : (spanName.innerText = nameExpense.value);
  spanName.className = "display-separator";

  const spanValue = document.createElement("span");
  type === "Income"
    ? (spanValue.innerText = valueIncome.value)
    : (spanValue.innerText = valueExpense.value);
  spanValue.className = "display-currency text-bold";

  type === "Income"
    ? (displaySumValueIncomes += Number(valueIncome.value))
    : (displaySumValueExpenses += Number(valueExpense.value));

  type === "Income"
    ? (sumValueIncomes.innerText = displaySumValueIncomes)
    : (sumValueExpenses.innerText = displaySumValueExpenses);

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

  const handleItemClick = (type) => {
    if (type === "Edit") {
      applyClass([spanName, spanValue, btnEdit, btnRemove], "hidden");

      const editNameForm = document.createElement("input");
      editNameForm.type = "text";
      editNameForm.className = "form-element-name";
      editNameForm.value = spanName.innerText;

      const editValueForm = document.createElement("input");
      editValueForm.type = "text";
      editValueForm.className = "form-element-value";
      editValueForm.value = spanValue.innerText;

      const saveBtn = document.createElement("button");
      saveBtn.innerText = "Zapisz";

      const cancelBtn = document.createElement("button");
      cancelBtn.innerText = "Anuluj";

      divItem.append(editNameForm, editValueForm, saveBtn, cancelBtn);

      const handleEditClick = (type) => {
        if (type === "Cancel") {
          removeTags([editNameForm, editValueForm, saveBtn, cancelBtn]);

          btnEdit.classList.remove("hidden");
          btnRemove.classList.remove("hidden");
          spanName.className = "display-separator";
          spanValue.className = "display-currency text-bold";
        } else if (type === "Save") {
          // to do
        }
      };

      cancelBtn.addEventListener("click", () => handleEditClick("Cancel"));
      saveBtn.addEventListener("click", () => handleEditClick("Save"));
    }
  };

  btnEdit.addEventListener("click", () => handleItemClick("Edit"));
  btnRemove.addEventListener("click", () => handleItemClick("Remove"));
};

btnAddIncome.addEventListener("click", () => handleClick("Income"));
btnAddExpense.addEventListener("click", () => handleClick("Expense"));
