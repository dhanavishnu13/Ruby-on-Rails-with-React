import { title } from 'process';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {createExpenseAsync} from './expenseSlice'
import {ThunkDispatch} from "@reduxjs/toolkit";
import { Navigate, redirect } from 'react-router';
import { useNavigate } from 'react-router-dom'; 


function ExpenseForm(user_info: any) {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [payee, setPayee]=useState('')
  const [description, setDescription]=useState('')
  const [amount, setAmount]=useState('')
  const [due_date,setDue_date]=useState('')
  const [category, setCategory]=useState('');
  const navigate = useNavigate();

  let flag=false
  let children;

  for (const key in user_info) {
    if (user_info.hasOwnProperty(key)) {
      children=user_info[key];
    }
  }


  function submitHandler(e: any){
    e.preventDefault();
    const formData = {
      expense: {
        payee_name: payee,
        description: description,
        categories_id: Number(category),
        user_id: children,
        amount: Number(amount),
        due_date: due_date
      }
    }
    dispatch(createExpenseAsync(formData));
    resetState();
    navigate('/expenses')
    // flag=true
    // debugger
  }

  function resetState(){
    setPayee('')
    setDescription('')
    setCategory('')
    setAmount('')
    setDue_date('')
  }
  return (
    <div className="container max-w-screen-lg mx-auto">
      <h3>ExpenseForm</h3>
      {children}
      <form>        
        <input
        type='text'
        className='form-control text-start'
        name='payee_name'
        placeholder='Payee Name'
        value={payee}
        onChange={(e)=>setPayee(e.target.value)} required/>
        <br/>
        <textarea
        className='form-control text-start'
        name='description'
        placeholder='Description'
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        />
        <br/>
        <select
        className='form-control text-start'
        name='category'
        value={Number(category)}
        onChange={(e)=>setCategory(e.target.value)}
      >
        <option value='0' selected disabled>Select one category</option>
        <option value='1'>Food</option>
        <option value='2'>Transportation</option>
        <option value='3'>Entertainment</option>
        <option value='4'>Rent</option>
        <option value='5'>Other</option>
        </select>
        <br/>
        <input
        type='number'
        className='form-control text-start'
        name='amount'
        placeholder='Amount'
        value={amount}
        onChange={(e)=>setAmount(e.target.value)} required
        />
        <br/>
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