import { View, StyleSheet, Text } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { GlobalStyles } from "../../constants/styles";
import { DUMMY_EXPENSES } from "../../store/expensesReducer";


function ExpensesOutput({expenses, expensesPeriod, fallbackText}) {
    var content = <Text style={styles.fallbackText}>{fallbackText}</Text>
    if(expenses.length >0){
        content = <ExpensesList expenses={expenses} />
    }
    return (
        <View style={styles.container}>
            <ExpensesSummary 
                periodName={expensesPeriod} 
                expenses={expenses}
            />
            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    fallbackText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '400',
        marginTop: 10,
        textAlign:"center"
    },
})
export default ExpensesOutput;