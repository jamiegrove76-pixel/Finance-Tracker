let expenses = [];
let table = document.getElementById("expense-table");
let form = document.getElementById("expense-form");
let expenseTotal = document.getElementById("expense-total");
let savedExpenses = localStorage.getItem("expenses");
let currentMonth = new Date().getMonth(); 
let currentYear = new Date().getFullYear(); 
if (savedExpenses) {
  expenses = JSON.parse(savedExpenses);
}
let savedMonth = localStorage.getItem("savedMonth");
let savedYear = localStorage.getItem("savedYear");
if (savedMonth !== null && (parseInt(savedMonth) !== currentMonth || parseInt(savedYear) !== currentYear)) {
  // Month has changed since last save — reset
  expenses = [];
  localStorage.setItem("expenses", JSON.stringify(expenses));
  localStorage.setItem("savedMonth", currentMonth);
  localStorage.setItem("savedYear", currentYear);
} else {
  // Same month — load as normal
  let saved = localStorage.getItem("expenses");
  if (saved) {
    expenses = JSON.parse(saved);
    // ...rebuild rows like before
  }
}
expenseTotal.textContent = "$" + expenses.reduce((total, exp) => total + parseFloat(exp.amount), 0).toFixed(2);

let saved = localStorage.getItem("expenses");
if (saved) {
  expenses = JSON.parse(saved);
  expenses.forEach(function(exp) {
    let newRow = document.createElement("tr");
    newRow.innerHTML = "<td>" + exp.date + "</td><td>" + exp.desc + "</td><td>-$" + exp.amount + "</td>";
    table.appendChild(newRow);
  });
}



form.addEventListener("submit", function(event) {
    event.preventDefault();
let date = new Date().toLocaleDateString();
let desc = document.getElementById("desc").value;
let amount = document.getElementById("amount").value;
let newRow = document.createElement("tr");
  newRow.innerHTML = "<td>" + date + "</td><td>" + desc + "</td><td>-$" + amount + "</td>";
  table.appendChild(newRow);
  expenseTotal.textContent = "$" + (parseFloat(expenseTotal.textContent.substring(1)) + parseFloat(amount)).toFixed(2);
expenses.push({ date: date, desc: desc, amount: amount });
localStorage.setItem("expenses", JSON.stringify(expenses));
});