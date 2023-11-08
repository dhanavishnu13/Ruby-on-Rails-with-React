import { title } from 'process';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {createExpenseAsync} from './expenseSlice'
import {ThunkDispatch} from "@reduxjs/toolkit";
function ExpenseForm() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [payee, setPayee]=useState('')
  const [description, setDescription]=useState('')
  const [amount, setAmount]=useState('')
  const [due_date,setDue_date]=useState('')

  function submitHandler(e: any){
    e.preventDefault();
    const formData = {
      expense: {
        payee_name: payee,
        description: description,
        amount: amount,
        due_date: due_date
      }
    }
    debugger;
    dispatch(createExpenseAsync(formData));
    resetState();
  }

  function resetState(){
    setPayee('')
    setDescription('')
  }
  return (
    <div>
      <h1>ExpenseForm</h1>
      <form>
        <input
        type='text'
        className='form-control text-start'
        name='payee_name'
        value={payee}
        onChange={(e)=>setPayee(e.target.value)}/>
        <textarea
        className='form-control text-start'
        name='description'
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        />
        <input
        type='number'
        className='form-control text-start'
        name='amount'
        value={amount}
        onChange={(e)=>setAmount(e.target.value)}
        />
        <input
        type='date'
        className='form-control text-start'
        name='due_date'
        value={due_date}
        onChange={(e)=>setDue_date(e.target.value)}
        />
        <button
        type='submit'
        onClick={(e)=>submitHandler(e)}>Submit</button>
      </form>

    </div>
  )
}

export default ExpenseForm