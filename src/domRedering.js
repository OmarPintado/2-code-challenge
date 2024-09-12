
export function displayExpenses(expensesArray){
    const expensesList = document.getElementById('expense-list');
    expensesList.innerHTML='';

    expensesArray.forEach((expense) => {
        const li = document.createElement('li');
        li.setAttribute('idExpense', expense.idExpense);

        li.innerHTML = `
        <strong>${expense.category.name}</strong> ${'| ' + expense.description} - ${'$ ' + expense.amount}
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
        `;
        expensesList.appendChild(li);
    })
}

export function populateCategoryOptions(categories){
    const categorySelect = document.getElementById('category');
    categorySelect.innerHTML = '';

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}

export function displayExpensesByCategory(expensesByCategory){
    const categoryList = document.getElementById('category-list');
    categoryList.innerText='';

    for (const [category, total] of Object.entries(expensesByCategory)) {
        const li = document.createElement('li');
        li.textContent = `${category}: $${total.toFixed(2)}`;
        categoryList.appendChild(li);
    }

}
