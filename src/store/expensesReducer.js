import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  expenses: []
}

export const counterSlice = createSlice({
  name: 'expensesReducer',
  initialState,
  reducers: {
    addExpense: (state, action) => {
        const exp = [action.payload]
        for(var i=0; i< state.expenses.length; i++) {
            exp.push(state.expenses[i]);
        }
        return {
            ...state,
            expenses: exp,
        }
    },
    setExpenses: (state, action) => {
        return {
            ...state,
            expenses: action.payload,
        }
    },
    updateExpense: (state, action) => {
        const updatableExpenseIndex = state.expenses.findIndex((expense) => expense.id === action.payload.id );
        const updatableExpense = state.expenses[updatableExpenseIndex];
        const updatedItem = {...updatableExpense, ...action.payload.data}
        const updatedExpenses = [...state.expenses];
        updatedExpenses[updatableExpenseIndex] = updatedItem;
        return {
            ...state,
            expenses: updatedExpenses
        };
    },
    deleteExpense: (state, action) => {
        const deleteId = action.payload;
        return {
            ...state,
            expenses: state.expenses.filter((expense) => expense.id != deleteId)
        }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setExpenses, addExpense, updateExpense, deleteExpense } = counterSlice.actions

export default counterSlice.reducer