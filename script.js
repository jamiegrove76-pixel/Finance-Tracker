let expenses = [];
let table = document.getElementById("expense-table");
let form = document.getElementById("expense-form");
let expenseTotal = document.getElementById("expense-total");

expenseTotal.textContent = "$0.00";

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