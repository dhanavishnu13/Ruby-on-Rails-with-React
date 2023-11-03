import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Statuses, fetchExpensesAsync, selectExpenses, selectStatus } from './expenseSlice'
import { execPath } from 'process';

function Expenses() {
  const expenses = useAppSelector(selectExpenses);
  const status = useAppSelector(selectStatus)
  const dispatch = useAppDispatch();

  useEffect(()=>{
      dispatch(fetchExpensesAsync())
  }, [dispatch])

  let contents;
  if (status !== Statuses.UpToDate){
      contents = <div>{status}</div>
  }else{
      contents=<div className='card'>
          <div className='card-body'>
              <h3>{status}</h3>
              {expenses && expenses.length>0 && expenses.map(expense =>{
                  return <div key={expense.id} style={{margin:"5em"}}>
                      <h3>{expense.payee_name}</h3>
                      <p>{expense.description}</p>
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