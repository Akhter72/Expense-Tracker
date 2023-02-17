import { View,StyleSheet, Text, Alert } from "react-native";
import { useState } from "react";
import Input from "./input";
import Button from '../UI/Button';

function ExpenseForm({onCancel, isEditing, onSubmit, defaultValues}) {
    const [inputValues, setInputValues] = useState({
        amount: defaultValues ? defaultValues.amount.toString() : '',
        date: defaultValues ? defaultValues.date.toISOString() : '',
        description: defaultValues ? defaultValues.description : '',
    });
    

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputValues((curInputValues) => {
            return {
                ...curInputValues,
                [inputIdentifier]: enteredValue
            }

        })
    }
    function submitHandler() {
        const expenseData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            description: inputValues.description,
        };
        const isValidAmount = !isNaN(expenseData.amount) && expenseData.amount>0 && expenseData.amount.toString().length<20;
        const isValidDate = expenseData.date.toString() !== 'Invalid Date';
        const isValidDescription = expenseData.description.trim().length > 0 && expenseData.description.trim().length < 100;
        if(!isValidAmount || !isValidDate || !isValidDescription) {
            Alert.alert("Invalid Input", "Please Check your input Values");
            return;
        }
        onSubmit(expenseData);
    }
    return (
        <View style={styles.form}>
            <Text style={styles.title}> Your Expense </Text>
            <View style={styles.inputsRow}>
                <Input 
                    label="Amount" 
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangedHandler.bind(this, 'amount'),
                        value: inputValues.amount
                        }}
                    style={styles.rowInput}
                />
                <Input 
                    label="Date" 
                    textInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,
                        onChangeText: inputChangedHandler.bind(this, 'date'),
                        value: inputValues.date,
                        }}
                    style={styles.rowInput}
                />
            </View>
            <Input label="Description" textInputConfig={{
                multiline: true,
                maxLength: 100,
                autoCorrect: false,
                // autoCapitalize: 'sentences' default
                onChangeText: inputChangedHandler.bind(this, 'description'),
                value: inputValues.description,
            }}
            />
            <View style={styles.buttons}>
                <Button style={styles.button} mode='flat' onPress={onCancel}>cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>{isEditing ? "Update" : "Add"}</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1,
    },
    form: {
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: "center",
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
        marginVertical: 20
    }
})

export default ExpenseForm;