import { useContext, useLayoutEffect, useState } from "react";
import {Text, View, StyleSheet, TextInput} from "react-native";
import ExpenseItem from "../components/ExpensesOutput/ExpenseItem";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { GlobalStyles } from "../constants/styles";
import { ExpenseContext } from "../store/expenses-context";
import { deleteHttpExpense, storeExpense, updateHttpExpense } from "../util/http";
import { addExpense, updateExpense, deleteExpense } from "../store/expensesReducer";

import { useSelector, useDispatch } from "react-redux";

function ManageExpense({route, navigation}) {

    // const expenses= useSelector(state => state.expenses);
    // console.log(expenses);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const expenses = useSelector(state => state.expenseReducer.expenses);
    const dispatch = useDispatch();

    const selectedExpense = expenses.find(
        (expense) => expense.id === editedExpenseId
    )
    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense"
        });
    },[navigation, isEditing]);

    async function deleteExpenseHandler() {
        setIsSubmitting(true);
        await deleteHttpExpense(editedExpenseId);
        setIsSubmitting(false);
        dispatch(deleteExpense(editedExpenseId));
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }
    
    async function confirmHandler(expenseData) {
        if(isEditing){
            dispatch(updateExpense({id: editedExpenseId, data: expenseData}));
            setIsSubmitting(false);
            await updateHttpExpense(editedExpenseId, expenseData);
            setIsSubmitting(false);
        }
        else {
            setIsSubmitting(false);
            const id = await storeExpense(expenseData);
            setIsSubmitting(false);
            dispatch(addExpense({...expenseData, id: id}));
        }
        navigation.goBack();
    }
if(isSubmitting) {
    return <LoadingOverlay />
}

    return (
        <View style={styles.container}>
            <View>
                <ExpenseForm 
                    onCancel={cancelHandler} 
                    isEditing={isEditing} 
                    onSubmit={confirmHandler}
                    defaultValues={selectedExpense}
                />
            </View>

            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler} />
                </View>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 24,
            backgroundColor: GlobalStyles.colors.primary800,
        },
        deleteContainer: {
            marginTop: 16,
            paddingTop: 8,
            borderTopWidth: 2,
            borderTopColor: GlobalStyles.colors.primary200,
            alignItems: "center",
        },
    })

export default ManageExpense;