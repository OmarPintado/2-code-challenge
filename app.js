import {
    displayExpenses,
    populateCategoryOptions,
    displayExpensesByCategory,
    Tracker
} from "./src";

(() => {
    'use strict';
    const tracker = new Tracker();
    const form = document.getElementById('expense-form');
    const expensesList = document.getElementById('expense-list');

    let expenses = tracker.loadExpenses();

    form.addEventListener('submit', (e) => tracker.addExpense(e));
    expensesList.addEventListener('click', (e)=> tracker.deleteExpense(e))


    document.addEventListener('DOMContentLoaded', () => {
        populateCategoryOptions(tracker.categories);
        displayExpenses(expenses);
        displayExpensesByCategory(tracker.getExpensesByCategory());
    });

})()
