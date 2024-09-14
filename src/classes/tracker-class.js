import { Category } from "./category-class.js";
import { Expense } from "./expense-class.js";
import { validateNumber, validateString } from "../validation.js";
import { displayExpenses, displayExpensesByCategory } from "../domRedering.js";
import { addSubmitClick, editSubmitClick } from "../eventsForm.js";
import { getDateFormat } from "../utils.js";

export class Tracker {
  constructor() {
    this.categories = [
      new Category("Food"),
      new Category("Transport"),
      new Category("Utilities"),
      new Category("Entertainment"),
      new Category("Others"),
    ];

    this.expenses = this.loadExpenses();
  }

  addCategory(name) {
    this.categories.push(new Category(name));
  }

  addExpense(e) {
    e.preventDefault();
    const amount = document.getElementById("amount").value.trim();
    const description = document.getElementById("description").value.trim();
    const date = document.getElementById("date").value;
    const category = document.getElementById("category").value;

    if (!validateString(description)) {
      console.log("Hay error");
    }

    if (!validateNumber(amount)) {
      console.log("Hay error");
    }

    const expense = new Expense(
      amount,
      description,
      date,
      new Category(category)
    );
    this.expenses.push(expense);
    this.saveExpenses();
    displayExpenses(this.expenses);
    displayExpensesByCategory(this.getExpensesByCategory());

    document.getElementById("expense-form").reset();
  }

  loadExpenses() {
    const data = localStorage.getItem("expenses");
    return data
      ? JSON.parse(data).map(
          (exp) =>
            new Expense(
              exp.amount,
              exp.description,
              new Date(exp.date),
              new Category(exp.category.name)
            )
        )
      : [];
  }

  saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(this.expenses));
  }

  getExpensesByCategory() {
    return this.expenses.reduce((acc, expense) => {
      const categoryName = expense.category.name;
      if (!acc[categoryName]) {
        acc[categoryName] = 0;
      }
      acc[categoryName] += Number(expense.amount);
      return acc;
    }, {});
  }

  deleteExpense(e) {
    const idExpense = e.target.parentElement.getAttribute("idExpense");
    this.expenses = this.expenses.filter(
      (expense) => Number(expense.idExpense) !== Number(idExpense)
    );
    this.saveExpenses();
    displayExpenses(this.expenses);
    displayExpensesByCategory(this.getExpensesByCategory());
  }

  editExpense(e) {
    const idExpense = e.target.parentElement.getAttribute("idExpense");
    const expense = this.expenses.find(
      (expense) => Number(expense.idExpense) === Number(idExpense)
    );

    if (expense == undefined) return;

    document.getElementById("amount").value = expense.amount;
    document.getElementById("description").value = expense.description;
    document.getElementById("date").value = getDateFormat(expense.date);
    document.getElementById("category").value = expense.category.name;

    const form = document.getElementById("expense-form");
    document.getElementById("expense-form__submit").textContent =
      "Edit Expense";

    form.dataset.id = idExpense;

    // Remove last function event
    form.removeEventListener("submit", addSubmitClick);

    // Add edit function event
    form.addEventListener("submit", editSubmitClick);
  }
}
