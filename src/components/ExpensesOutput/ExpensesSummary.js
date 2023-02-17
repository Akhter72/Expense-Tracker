import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function expensesSum(expenses) {
    let sum = 0;
    for (let i = 0; i < expenses.length; i++) {
        sum += expenses[i].amount;
    }
    return sum.toFixed(2);
}
function ExpensesSummary({periodName, expenses}) {

    return (
        <View style={styles.container}> 
            <Text style={styles.period}>{periodName}</Text>
            <Text style={styles.sum}>Rs {expensesSum(expenses)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    period: {
        fontSize: 16,
        color: GlobalStyles.colors.primary400,
    },
    sum: {
        fontSize: 18,
        color: GlobalStyles.colors.primary400,
        fontWeight: 'bold',
        
    }
})

export default ExpensesSummary;
