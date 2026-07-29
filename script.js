let expenses = [];
let income = [];

let table = document.getElementById("expense-table");
let form = document.getElementById("expense-form");
let expenseTotal = document.getElementById("expense-total");

let incomeTable = document.getElementById("income-table");
let incomeForm = document.getElementById("income-form");
let incomeTotal = document.getElementById("income-total");

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

let savedMonth = localStorage.getItem("savedMonth");
let savedYear = localStorage.getItem("savedYear");

if (savedMonth !== null && (parseInt(savedMonth) !== currentMonth || parseInt(savedYear) !== currentYear)) {
  expenses = [];
  localStorage.setItem("expenses", JSON.stringify(expenses));
  localStorage.setItem("savedMonth", currentMonth);
  localStorage.setItem("savedYear", currentYear);
} else {
  let savedExpenses = localStorage.getItem("expenses");
  if (savedExpenses) {
    expenses = JSON.parse(savedExpenses);
  }
}

if (expenseTotal) {
  let total = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  expenseTotal.textContent = "$" + total.toFixed(2);
}

if (table) {
  expenses.forEach(function (exp) {
    let newRow = document.createElement("tr");
    newRow.innerHTML = "<td>" + exp.date + "</td><td>" + exp.desc + "</td><td>-$" + exp.amount + "</td>";
    table.appendChild(newRow);
  });
}

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let date = new Date().toLocaleDateString();
    let desc = document.getElementById("desc").value;
    let amount = document.getElementById("amount").value;

    if (table) {
      let newRow = document.createElement("tr");
      newRow.innerHTML = "<td>" + date + "</td><td>" + desc + "</td><td>-$" + amount + "</td>";
      table.appendChild(newRow);
    }

    expenses.push({ date: date, desc: desc, amount: amount });
    localStorage.setItem("expenses", JSON.stringify(expenses));

    if (expenseTotal) {
      let total = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
      expenseTotal.textContent = "$" + total.toFixed(2);
    }
  });
}

let savedIncomeMonth = localStorage.getItem("savedIncomeMonth");
let savedIncomeYear = localStorage.getItem("savedIncomeYear");

if (savedIncomeMonth !== null && (parseInt(savedIncomeMonth) !== currentMonth || parseInt(savedIncomeYear) !== currentYear)) {
  income = [];
  localStorage.setItem("income", JSON.stringify(income));
  localStorage.setItem("savedIncomeMonth", currentMonth);
  localStorage.setItem("savedIncomeYear", currentYear);
} else {
  let savedIncome = localStorage.getItem("income");
  if (savedIncome) {
    income = JSON.parse(savedIncome);
  }
}

if (incomeTotal) {
  let total = income.reduce((sum, inc) => sum + parseFloat(inc.amount), 0);
  incomeTotal.textContent = "$" + total.toFixed(2);
}

if (incomeTable) {
  income.forEach(function (inc) {
    let newRow = document.createElement("tr");
    newRow.innerHTML = "<td>" + inc.date + "</td><td>" + inc.desc + "</td><td>+$" + inc.amount + "</td>";
    incomeTable.appendChild(newRow);
  });
}

if (incomeForm) {
  incomeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let date = new Date().toLocaleDateString();
    let desc = document.getElementById("desc").value;
    let amount = document.getElementById("amount").value;

    if (incomeTable) {
      let newRow = document.createElement("tr");
      newRow.innerHTML = "<td>" + date + "</td><td>" + desc + "</td><td>+$" + amount + "</td>";
      incomeTable.appendChild(newRow);
    }

    income.push({ date: date, desc: desc, amount: amount });
    localStorage.setItem("income", JSON.stringify(income));

    if (incomeTotal) {
      let total = income.reduce((sum, inc) => sum + parseFloat(inc.amount), 0);
      incomeTotal.textContent = "$" + total.toFixed(2);
    }
  });
}