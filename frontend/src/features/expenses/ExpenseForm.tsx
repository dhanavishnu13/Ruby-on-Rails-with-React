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
  const [category, setCategory]=useState('');
  function submitHandler(e: any){
    e.preventDefault();
    const formData = {
      expense: {
        payee_name: payee,
        description: description,
        category: category,
        amount: amount,
        due_date: due_date
      }
    }
    console.log(formData)
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
        placeholder='Payee Name'
        value={payee}
        onChange={(e)=>setPayee(e.target.value)} required/>
        <textarea
        className='form-control text-start'
        name='description'
        placeholder='Description'
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        />
        <select
        className='form-control text-start'
        name='category'
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
      >
        <option value='food'>Food</option>
        <option value='transportation'>Transportation</option>
        <option value='entertainment'>Entertainment</option>
        <option value='rent'>Rent</option>
        <option value='other'>Other</option>
        </select>
        <input
        type='number'
        className='form-control text-start'
        name='amount'
        placeholder='Amount'
        value={amount}
        onChange={(e)=>setAmount(e.target.value)} required
        />
        <input
        type='date'
        className='form-control text-start'
        name='due_date'
        placeholder='Due Date'
        value={due_date}
        onChange={(e)=>setDue_date(e.target.value)} required
        />
        <br/>
        <button
        type='submit'
        className='btn btn-success'
        onClick={(e)=>submitHandler(e)}>Submit</button>
      </form>

    </div>
  )
}

export default ExpenseForm