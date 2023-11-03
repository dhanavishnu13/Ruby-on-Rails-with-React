import { ExpenseState } from "./expenseSlice";

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