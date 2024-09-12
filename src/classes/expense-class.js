export class Expense {
    static idExpense = 0;
    constructor(amount, description, date = new Date(), category) {
        this.amount = amount;
        this.description = description;
        this.date = date;
        this.category = category;

        this.idExpense = ++Expense.idExpense;
    }
}
