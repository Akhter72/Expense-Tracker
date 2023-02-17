import axios from "axios";
const BASE_URL ='https://expense-tracker-275fc-default-rtdb.asia-southeast1.firebasedatabase.app';
export async function storeExpense(expenseData) {
    const response = await axios.post(BASE_URL + '/expenses.json', expenseData);
    const id = response.data.name;
    return id;
}

export async function fetchExpenses() {
    const response = await axios.get( BASE_URL + '/expenses.json');
    const expenses = [];
    for( const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        };
        expenses.push(expenseObj);
    }
    return expenses;
    console.log();
}

export async function updateHttpExpense(id, expenseData) {
    await axios.put(BASE_URL + `/expenses/${id}.json`, expenseData);
}

export async function deleteHttpExpense(id) {
    await axios.delete(BASE_URL + `/expenses/${id}.json`);
}