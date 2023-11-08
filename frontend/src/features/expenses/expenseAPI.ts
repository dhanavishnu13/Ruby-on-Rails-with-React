import { error } from "console";
import { ExpenseDeleteData, ExpenseFormData, ExpenseState } from "./expenseSlice";

const API_URL = "http://localhost:3000";

export async function fetchExpenses(){
    return fetch(`${API_URL}/expenses.json`, {
        method: "GET",
        headers :{
            "Content-Type":"application/json",
        },
    })
    .then((response)=> response.json())
    .catch((error)=>{
        console.log("Error: ",error);
        return {} as ExpenseState;
    })
}

export async function createExpense(payload: ExpenseFormData){
    const expense=payload.expense;
    return fetch(`${API_URL}/expenses.json`, {
        method: "POST",
        headers :{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            expense
        })
    })
    .then((response)=> response.json())
    .catch((error)=>{
        console.log("Error: ",error);
        return {} as ExpenseState;
    })
}

export async function destoryExpense(payload: ExpenseDeleteData) {
    const expense = payload.expense
    return fetch(`${API_URL}/expenses/${expense.expense_id}.json`,{
        method: "DELETE",
        headers: {
            "content-type":"application/json",
        },
        body: JSON.stringify({
            expense
        })
    })
    .then((response)=>response.json())
    .catch((error)=>{
        console.log("Error: ",error);
        return {} as ExpenseState;
    })
}