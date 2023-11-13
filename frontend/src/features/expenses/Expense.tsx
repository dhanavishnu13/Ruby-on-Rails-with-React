import React, { useState, useEffect } from 'react'
import ButtonGroup from './ButtonGroup';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import CardGroup from 'react-bootstrap/CardGroup';

function Expense(props: any) {
    const [payee, setPayee]=useState(props.expense.payee_name)
    const [description, setDescription]=useState(props.expense.description);
    const [category, setCategory]=useState(props.expense.category)
    const [amount, setAmount]=useState(props.expense.amount)
    const [due_date, setDue_date]=useState(props.expense.due_date)

    const categoryMapping: { [key: number]: string } = {
      1: "Food",
      2: "Transportation",
      3: "Entertainment",
      4: "Rent",
      5: "Other",
      // Add more entries as needed
    };
    
    function getCategoryName(categoryId: string): string {
      return categoryMapping[categoryId] || "Unknown Category";
    }

    

    const [isEditing, setIsEditing]=useState(props.expenseToEdit===props.expense.id);
    useEffect(()=>{
        setIsEditing(props.expenseToEdit === props.expense.id);
    }, [props.expenseToEdit, props.expense.id])

    function submitHandler(e:any){
      e.preventDefault();
      const formData = {
        expense: {
          id: props.expense.id,
          payee_name: payee,
          description: description,
          categories_id: category,
          user_id: props.user_info,
          amount: amount,
          due_date: due_date
        }
      }
      console.log(formData)
      props.submitEdit(formData)
      resetState();
    }

    function resetState(){
      setPayee(props.expense.payee_name)
      setDescription(props.expense.description)
      setCategory(props.expense.category)
      setAmount(props.expense.amount)
      setDue_date(props.expense.due_date)
    }
    const payeeElement = <h5>{props.expense.payee_name}</h5>
    const descElement = <p>{props.expense.description}</p>
    const categoryElement = <p>{getCategoryName(props.expense.categories_id)}</p>
    const amountElement = <p>{props.expense.amount}</p>
    const dateElement = <p>{props.expense.due_date}</p>

    const editablePayee = <input
      type='text'
      value={payee}
      onChange={(e)=> setPayee(e.target.value)}
    /> ;
    const editableDescription = <textarea 
    value={description}
    onChange={(e)=>setDescription(e.target.value)}/>

    const editableCategory=<select
    value={category}
    onChange={(e)=>setCategory(e.target.value)}
    >
    <option value='0' selected disabled>Select one category</option>
    <option value='1' >Food</option>
    <option value='2'>Transportation</option>
    <option value='3'>Entertainment</option>
    <option value='4'>Rent</option>
    <option value='5'>Other</option>
    </select>

    const editableAmount=<input 
                  type='number'
                  value={amount}
                  onChange={(e)=>setAmount(e.target.value)}
    />
    const editableDate=<input
    type='date'
    value={due_date}
    onChange={(e)=> setDue_date(e.target.value)}/>

    const submitButton = <button
      type='submit'
      className='btn btn-secondary'
      onClick={(e)=>submitHandler(e)}>Submit</button>

  // Assuming props.expense.updated_at is a valid date string
  const updatedDate = new Date(props.expense.updated_at);

  // Format the date to the Indian standard format (dd/mm/yyyy)
  const day = updatedDate.getDate();
  const month = updatedDate.getMonth() + 1; // Month is 0-based, so add 1
  const year = updatedDate.getFullYear();
  const hours = updatedDate.getHours();
  const minutes = updatedDate.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 || 12;

  // Add leading zeros if needed
  const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
  const formattedTime = `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;

  return <tr>
    <td>{isEditing?editablePayee : payeeElement}</td>
    <td>{isEditing?editableDescription: descElement}</td>
    <td>{isEditing?editableCategory: categoryElement}</td>
    <td>{isEditing? editableAmount : amountElement}</td>
    <td>{isEditing? editableDate : dateElement}</td>
    <td><ButtonGroup
                expense_id={props.expense.id}
                dispatch={props.dispatch}
                toggleEditform={props.toggleEditform}
                />
      {isEditing ? submitButton : ""}</td>
  </tr>
  
}

export default Expense