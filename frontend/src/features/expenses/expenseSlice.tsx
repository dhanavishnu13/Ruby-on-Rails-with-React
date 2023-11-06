import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import produce from 'immer'
import { RootState } from '../../app/store'
import { fetchExpenses, createExpense } from './expenseAPI'
import { platform } from 'os'


export enum Statuses{
    Initial = "Not Fetched",
    Loading = "Loading...",
    UpToDate = "Up To Date",
    Deleted = "Deleted",
    Error = 'Error'
}

export interface ExpenseFormData{
    expense: {
        id?:string;
        payee_name?: string,
        description?: string,
        amount?: number,
        due_date?: any,
    }
}

export interface ExpenseState {
    id?: number,
    payee_name?: string,
    description?: string,
    amount?: number,
    due_date?: any,
    created_at?: any,
    updated_at?: any
}

export interface ExpensesState{
    expenses: ExpenseState[];
    status: string;
}

const initialState: ExpensesState={
    expenses:[
        {
            id: 0,
            payee_name: "",
            description: "",
            amount: 0,
            due_date:"",
            created_at: "",
            updated_at: "",
            }
    ],
    status: Statuses.Initial
}

export const fetchExpensesAsync = createAsyncThunk(
    'expenses/fetchExpenses',
    async ()=>{
        const response = await fetchExpenses();
        return response
    }
)

export const createExpenseAsync = createAsyncThunk(
    'expenses/createExpense',
    async (payload: ExpenseFormData)=>{
        const response = await createExpense(payload)

        return response
    }
)

export const expenseSlice = createSlice({
    name: 'expenses',
    initialState,
    /***
     * 
     * **/
     reducers: {},
     extraReducers:  (builder) =>{
        builder
            .addCase(fetchExpensesAsync.pending, (state)=>{
                return produce(state, (draftState) =>{
                    draftState.status = Statuses.Loading
                })
            })
            .addCase(fetchExpensesAsync.fulfilled, (state, action)=>{
                return produce(state, (draftState) =>{
                    draftState.expenses=action.payload;
                    draftState.status = Statuses.UpToDate;
                })
            })
            .addCase(fetchExpensesAsync.rejected, (state)=>{
                return produce(state, (draftState) =>{
                    draftState.status = Statuses.Error
                })
            })
            /**update section */
            .addCase(createExpenseAsync.pending, (state)=>{
                return produce(state, (draftState) =>{
                    draftState.status = Statuses.Loading
                })
            })
            .addCase(createExpenseAsync.fulfilled, (state, action)=>{
                return produce(state, (draftState) =>{
                    draftState.expenses.push(action.payload);
                    draftState.status = Statuses.UpToDate;
                })
            })
            .addCase(createExpenseAsync.rejected, (state)=>{
                return produce(state, (draftState) =>{
                    draftState.status = Statuses.Error
                })
            })
     }
})

export const {} = expenseSlice.actions

export const selectExpenses = (state: RootState)=> state.expenses.expenses;

export const selectStatus=(state: RootState) =>state.expenses.status;

export default expenseSlice.reducer;