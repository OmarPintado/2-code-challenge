import { addSubmitClick } from "./src/eventsForm.js";
import {
  displayExpenses,
  populateCategoryOptions,
  displayExpensesByCategory,
  Tracker,
} from "./src/index.js";

export const tracker = new Tracker();

(() => {
  "use strict";
  const form = document.getElementById("expense-form");
  const expensesList = document.getElementById("expense-list");

  let expenses = tracker.expenses;
  form.reset();

  form.addEventListener("submit", addSubmitClick);
  expensesList.addEventListener("click", (e) => {
    const classElement = e.target.classList;

    // Select method
    if (classElement.contains("edit-btn")) tracker.editExpense(e);
    else if (classElement.contains("delete-btn")) tracker.deleteExpense(e);
  });

  document.addEventListener("DOMContentLoaded", () => {
    populateCategoryOptions(tracker.categories);
    displayExpenses(expenses);
    displayExpensesByCategory(tracker.getExpensesByCategory());
  });
})();
