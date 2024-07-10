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

sumValueIncomes.innerText = displaySumValueIncomes;
sumValueExpenses.innerText = displaySumValueExpenses;

const handleClick = (type) => {
  const li = document.createElement("li");
  type === "Income" ? listIncomes.appendChild(li) : listExpenses.appendChild(li);

  const spanName = document.createElement("span");
  type === "Income"
    ? (spanName.innerText = nameIncome.value + " - ")
    : (spanName.innerText = nameExpense.value + " - ");
  li.appendChild(spanName);

  const spanValue = document.createElement("span");
  type === "Income"
    ? (spanValue.innerText = valueIncome.value)
    : (spanValue.innerText = valueExpense.value);
  spanValue.className = "display-currency text-bold";
  li.appendChild(spanValue);

  type === "Income"
    ? (displaySumValueIncomes += Number(valueIncome.value))
    : (displaySumValueExpenses += Number(valueExpense.value));

  type === "Income"
    ? (sumValueIncomes.innerText = displaySumValueIncomes)
    : (sumValueExpenses.innerText = displaySumValueExpenses);
};

btnAddIncome.addEventListener("click", () => handleClick("Income"));
btnAddExpense.addEventListener("click", () => handleClick("Expense"));
