import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Statuses, fetchExpensesAsync, selectExpenses, selectStatus, updateExpenseAsync } from './expenseSlice'
import { execPath } from 'process';
import ExpenseForm from './ExpenseForm';
import Expense from './Expense';
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom';

function Expenses(user: any) {
  const expenses = useAppSelector(selectExpenses);
  const status = useAppSelector(selectStatus)
  const dispatch = useAppDispatch();
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchPayee, setSearchPayee] = useState('')

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

  const handleSortByDate = ()=>{
    setSortOrder(sortOrder === '1' ? '-1' : '1');
  }
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

  const filteredExpenses = expenses && expenses.length > 0
  ? expenses
      .filter((expense) => expense.user_id === user_id[1])
      .filter((expense) => expense.payee_name.toLowerCase().includes(searchPayee.toLowerCase()))
      .sort((a, b) => sortOrder * (new Date(b.due_date) - new Date(a.due_date)))
  : [];
  

  let contents;
  if (status !== Statuses.UpToDate){
      contents = <div>{status}</div>
  }else{
      contents=<div className='card'>
          <div className='card-body'>
              {/* <h3>{status}{user_id[1]}</h3>
              *form post here */}
              <h3>Hi, {user_id}</h3>
              <h4>Expense List</h4>
              <br/>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <div style={{ marginRight: '10px' }}>
                  <input
                  type='text'
                  className='form-control text-start'
                  name='payee_name'
                  placeholder='Payee Name'
                  
                  // value={payee_name}
                  onChange={(e)=>setSearchPayee(e.target.value)} required/>
                </div>
              
              <button style={{ float: 'right' }} className='btn btn-primary' onClick={handleSortByDate}>
                Sort by Date {sortOrder === '1' ? '▼' : '▲'}</button>
              </div>
              <br/>
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
              {filteredExpenses.length==0?
               <tr><td colspan="7">
               <div className="container">
                 <div className="row justify-content-center">
                   <div className="col-6 text-center">
                    No record found!
                   </div>
                 </div>
               </div>
               </td></tr>:""}
              {filteredExpenses
              .map(expense => {
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
            <div style={{ textAlign: 'center' }}>
            <Link to='/form' className='btn btn-success'>New Expense</Link>
            </div>
            {/* <ExpenseForm user_info={user_id[1]}/> */}
            <br/>
            <br/>
            {filteredExpenses.length==0?"":
            <div>
            <h3>Summary</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(categorySummary).map(category => (
                        <tr key={category}>
                            <td>{category}</td>
                            <td>{categorySummary[category]}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>
            }
          </div>
      </div>
  }

return (
  <div>
      {contents}
  </div>

)
}

export default Expenses