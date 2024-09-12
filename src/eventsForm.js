import { tracker } from "../app.js";
import { Category } from "./classes/category-class.js";
import { displayExpenses, displayExpensesByCategory } from "./domRedering.js";

export const addSubmitClick = (e) => {
  e.preventDefault();

  tracker.addExpense(e);
};

export const editSubmitClick = (e) => {
  e.preventDefault();

  const form = document.getElementById("expense-form");
  handleeditSubmitClick(form.dataset.id);
};

const handleeditSubmitClick = (idExpense) => {
  const ind = tracker.expenses.findIndex(
    (expense) => Number(expense.idExpense) === Number(idExpense)
  );

  if (ind === -1) return;

  const newAmount = document.getElementById("amount").value;
  const newDescription = document.getElementById("description").value;
  const newDate = document.getElementById("date").value;
  const newCategory = new Category(document.getElementById("category").value);

  tracker.expenses[ind].amount = newAmount;
  tracker.expenses[ind].description = newDescription;
  tracker.expenses[ind].date = newDate;
  tracker.expenses[ind].category = newCategory;

  tracker.saveExpenses();

  const form = document.getElementById("expense-form");
  delete form.dataset.id;
  document.getElementById("expense-form__submit").textContent = "Add Expense";
  form.removeEventListener("submit", editSubmitClick);
  form.addEventListener("submit", addSubmitClick);
  form.reset();

  displayExpenses(tracker.expenses);
  displayExpensesByCategory(tracker.getExpensesByCategory());
};
