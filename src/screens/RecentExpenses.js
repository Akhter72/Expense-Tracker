import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { ExpenseContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import { setExpenses } from "../store/expensesReducer";

function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(true);
    const expenses = useSelector(state => state.expenseReducer.expenses);
    const dispatch = useDispatch();
    useEffect(() => {
        async function getExpenses() {
            const expenses = await fetchExpenses();
            setIsFetching(false);
            dispatch(setExpenses(expenses));
        }
        getExpenses();
    },[]);

    if (isFetching) {
        return <LoadingOverlay />;
    }

    // function RecentExpenses1()  {
    //     const newExpenses = [];
    //     for(const i=0; i< expenses.length; i++) {
    //         console.log(expenses[i]);
    //         console.log('hello');
    //         const today = new Date();
    //         const date7DaysAgo = getDateMinusDays(today, 7);
           
    //             newExpenses.push(expenses[i]);
            
    //     }
    //     return newExpenses;
    // }r
    const resentExpenses = expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return (expense.date >= date7DaysAgo) && (expense.date <= today);
    })
    return (
        <ExpensesOutput 
            expensesPeriod={"Last 7 Days"} 
            expenses={resentExpenses}
            fallbackText="No Expenses Registered in last 7 Days"
        />
    )
}

export default RecentExpenses;