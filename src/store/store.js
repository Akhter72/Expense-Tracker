import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import expensesReducer from './expensesReducer'
export const store = configureStore({
  reducer: {
    expenseReducer: expensesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
})