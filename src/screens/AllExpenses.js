import { useContext } from "react";
import { useSelector } from "react-redux";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expenses-context";

function AllExpenses() {
    const expensesCtx = useContext(ExpenseContext);
    const expenses = useSelector(state => state.expenseReducer.expenses);
    console.log(expenses);
    return (
        <ExpensesOutput 
            expensesPeriod="Total Expenses " 
            expenses={expenses}
            fallbackText="No Expenses Registered"
        />
    )
}

export default AllExpenses;