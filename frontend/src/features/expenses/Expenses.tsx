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
      user_id.push(user[key]);
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
    console.log(formData)
    toggleEditform();
  }

  const categoryMapping: { [key: number]: string } = {
    1: "Food",
    2: "Transportation",
    3: "Entertainment",
    4: "Rent",
    5: "Other",
  };
  
  function getCategoryName(categoryId: string): string {
    return categoryMapping[categoryId] || "Unknown Category";
  }
  
  const categorySummary: { [key: string]: number } = {};

  expenses
        .filter(expense => expense.user_id === user_id[1])
        .forEach(expense => {
            const category = getCategoryName(expense.categories_id);
            const amount = parseFloat(expense.amount);

            if (category in categorySummary) {
                categorySummary[category] += amount;
            } else {
                categorySummary[category] = amount;
            }
        });

  let contents;
  if (status !== Statuses.UpToDate){
      contents = <div>{status}</div>
  }else{
      contents=<div className='card'>
          <div className='card-body'>
              <h3>{status}{user_id[1]}</h3>
              {/**form post here */}

              <ExpenseForm user_info={user_id[1]}/>
              <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Payee</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
              {expenses && expenses.length > 0 && expenses.filter(expense => expense.user_id === user_id[1]).map(expense => {
              return (
                
                  <Expense
                    dispatch={dispatch}
                    expense={expense}
                    toggleEditform={() => toggleEditform(expense.id)}
                    expenseToEdit={expenseToEdit}
                    submitEdit={submitEdit}
                    user_info={user_id[1]}
                  />
                
              );
            })}
            </tbody>
            </Table>
            <br/>
            <h3>Summary</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Display summarized data */}
                    {Object.keys(categorySummary).map(category => (
                        <tr key={category}>
                            <td>{category}</td>
                            <td>{categorySummary[category]}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

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