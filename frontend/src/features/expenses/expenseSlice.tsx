import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import produce from 'immer'
import { RootState } from '../../app/store'
import { fetchExpenses, createExpense, destoryExpense, updateExpense } from './expenseAPI'
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
        categories_id?: number,
        user_id?:number,
        amount?: number,
        due_date?: string,
    }
}

export interface ExpenseState {
    id?: number,
    payee_name?: string,
    description?: string,
    categories_id?: number,
    user_id?:number,
    amount?: number,
    due_date?: any,
    created_at?: any,
    updated_at?: any
}
export interface PostUpdateData{
    expense_id: number
    expense: ExpenseState
}

export interface ExpenseDeleteData{
    expense:{
        expense_id: number;
    }
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
            categories_id: 0,
            user_id:0,
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

export const updateExpenseAsync = createAsyncThunk(
    'expenses/updateExpense',
    async (payload: ExpenseFormData)=>{
        const response = await updateExpense(payload);
        return response
    }
)

export const destoryExpenseAsync = createAsyncThunk(
    'expenses/destoryExpense',
    async (payload: ExpenseDeleteData)=>{
        const response = await destoryExpense(payload)

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
            /**update section*/
            .addCase(updateExpenseAsync.pending, (state)=>{
                return produce(state, (draftState) =>{
                    draftState.status = Statuses.Loading
                })
            })
            .addCase(updateExpenseAsync.fulfilled, (state, action)=>{
                return produce(state, (draftState) =>{
                    const index=draftState.expenses.findIndex(
                        expense=> expense.id === action.payload.id
                    );
                    draftState.expenses[index]=action.payload;
                    draftState.status = Statuses.UpToDate;
                })
            })
            .addCase(updateExpenseAsync.rejected, (state)=>{
                return produce(state, (draftState) =>{
                    draftState.status = Statuses.Error
                })
            })
            /**Delete section*/
            .addCase(destoryExpenseAsync.pending, (state)=>{
                return produce(state, (draftState) =>{
                    draftState.status = Statuses.Loading
                })
            })
            .addCase(destoryExpenseAsync.fulfilled, (state, action)=>{
                return produce(state, (draftState) =>{
                    draftState.expenses=action.payload;
                    draftState.status = Statuses.UpToDate;
                })
            })
            .addCase(destoryExpenseAsync.rejected, (state)=>{
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