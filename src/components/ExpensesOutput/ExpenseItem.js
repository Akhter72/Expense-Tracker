import { Pressable, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

function ExpenseItem({description, date, amount, id}) {
    const navigation = useNavigation();
    function itemPressHandler() {
        navigation.navigate("ManageExpense", {
            expenseId: id,
        })
    }
    return (
        <Pressable 
            onPress={itemPressHandler}
            style={({pressed}) => pressed ? [styles.container,styles.pressed]: styles.container} 
        >
            <View>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.date}>{date.toISOString().slice(0,10)}</Text>
            </View>
            <View style={styles.amountContainer}>
                <Text style={styles.amount}>Rs {amount}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        marginTop: 5,
        
        backgroundColor: GlobalStyles.colors.primary500,
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,

    },
    amount: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold'
    },
    description: {
        fontSize:16,
        color: GlobalStyles.colors.primary50,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 14,
        color: GlobalStyles.colors.primary100,
    },
    pressed: {
        opacity: 0.75,
    }
})

export default ExpenseItem;