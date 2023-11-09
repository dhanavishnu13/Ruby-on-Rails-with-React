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
          category: category,
          amount: amount,
          date: due_date
        }
      }
      debugger
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
    const payeeElement = <h1>{props.expense.payee_name}</h1>
    const descElement = <p>{props.expense.description}</p>
    const categoryElement = <p>{props.expense.category}</p>
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
    ><option value='food'>Food</option>
    <option value='transportation'>Transportation</option>
    <option value='entertainment'>Entertainment</option>
    <option value='rent'>Rent</option>
    <option value='other'>Other</option>
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

  return <CardGroup>
    <Card style={{ width: '18rem' }}>
      {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
      <Card.Body>
        <Card.Title>{isEditing?editablePayee : payeeElement}</Card.Title>
        <Card.Text>
        {isEditing?editableDescription: descElement}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        {/* <ListGroup.Item>{isEditing?editableDescription : descElement}</ListGroup.Item> */}
        <ListGroup.Item>{isEditing? editableCategory : categoryElement}</ListGroup.Item>
        <ListGroup.Item>{isEditing? editableAmount : amountElement}</ListGroup.Item>
        <ListGroup.Item>{isEditing? editableDate : dateElement}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
      <ButtonGroup
                expense_id={props.expense.id}
                dispatch={props.dispatch}
                toggleEditform={props.toggleEditform}
                />
      {isEditing ? submitButton : ""}
      </Card.Body>
      <Card.Footer>
          <small className="text-muted">{formattedDate} {formattedTime}</small>
        </Card.Footer>
    </Card>
  </CardGroup>
}

export default Expense