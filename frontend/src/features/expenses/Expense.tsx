import React, { useState, useEffect } from 'react'
import ButtonGroup from './ButtonGroup';

function Expense(props: any) {
    const [title, setPayee]=useState(props.expense.payee_name)
    const [description, setDescription]=useState(props.expense.description);

    const payeeElement = <h2 className='title text-start'>{props.expense.payee_name}</h2>
    const descElement = <p className='card-text text-start'>{props.expense.description}</p>
  return (
    <div>
        <div className="row">
            <div className="col-8">
                {/* {payeeElement} */}
            </div>
            <div className="col-4">
                {/**Button group */}
                <ButtonGroup
                expense_id={props.expense.id}
                dispatch={props.dispatch}
                />
            </div>
        </div>
        <div className='row'>
            <div className="col-8">
                {/* {descElement} */}
            </div>
        </div>
        <div className="row">
            <div className="col-2">
                {/**Edit submit button */}
            </div>
        </div>
    </div>
  )
}

export default Expense