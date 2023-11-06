import { title } from 'process';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {createExpenseAsync} from './expenseSlice'

function ExpenseForm() {
  const dispatch = useDispatch();
  const [payee, setPayee]=useState('')
  const [description, setDescription]=useState('')

  function submitHandler(e: any){
    e.preventDefault();
    const formData = {
      expense: {
        payee: payee,
        description: description
      }
    }
    dispatch(createExpenseAsync(formData))
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
        <button
        type='submit'
        onClick={(e)=>submitHandler(e)}>Submit</button>
      </form>

    </div>
  )
}

export default ExpenseForm