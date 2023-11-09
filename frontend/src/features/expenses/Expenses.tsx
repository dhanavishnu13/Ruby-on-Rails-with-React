import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Statuses, fetchExpensesAsync, selectExpenses, selectStatus, updateExpenseAsync } from './expenseSlice'
import { execPath } from 'process';
import ExpenseForm from './ExpenseForm';
import Expense from './Expense';
import Table from 'react-bootstrap/Table'

function Expenses(user: any) {
  const expenses = useAppSelector(selectExpenses);
  const status = useAppSelector(selectStatus)
  const dispatch = useAppDispatch();
  // const children = [];

  // for (const key in loggedInStatus) {
  //   if (loggedInStatus.hasOwnProperty(key)) {
  //     children.push(<div key={key}>{loggedInStatus[key]}</div>);
  //   }
  // }

  const user_id = [];

  for (const key in user) {
    if (user.hasOwnProperty(key)) {
      user_id.push(<div key={key}>{user[key]}</div>);
    }
  }
  const [expenseToEdit, SetExpenseToEdit]=useState(0);

  useEffect(()=>{
      dispatch(fetchExpensesAsync())
  }, [dispatch])

  function toggleEditform(expense_id?:number){
    if (expenseToEdit ===expense_id){
        SetExpenseToEdit(0);
    }else{
        SetExpenseToEdit(expense_id as number);
    }
  }

  function submitEdit(formData: any){
    dispatch(updateExpenseAsync(formData));
    toggleEditform();
  }

  let contents;
  if (status !== Statuses.UpToDate){
      contents = <div>{status}</div>
  }else{
      contents=<div className='card'>
          <div className='card-body'>
              <h3>{status}{user_id[1]}</h3>
              {/**form post here */}
              <ExpenseForm user_info={user_id[1]}/>
              {expenses && expenses.length>0 && expenses.map(expense =>{
                  return <div key={expense.id} style={{margin:"5em"}}>
                      {/* <h3>{expense.payee_name}</h3>
                      <p>{expense.description}</p>
                      <p>{expense.amount}</p>
                      <p>{expense.due_date}</p> */}
                      <Expense
                      dispatch={dispatch}
                      expense={expense}
                      toggleEditform={()=> toggleEditform(expense.id)}
                      expenseToEdit={expenseToEdit}
                      submitEdit={submitEdit}
                      
                      />
                      </div>
              })}
          </div>
      </div>
  }

return (
  <div>
      <h1>Expense</h1>
      {contents}
  </div>

)
}

export default Expenses