import {destoryExpenseAsync} from './expenseSlice' 

function ButtonGroup(props:any) {
    function handleClick(e:any){
        const payload={
            expense: {
                expense_id: props.expense_id
            }
        }
        props.dispatch(destoryExpenseAsync(payload))
    }
  return (
    <div className='btn-group float-end'>
        <button className='btn btn-warning'>Edit</button>
        <button className='btn btn-danger' onClick={(e)=>handleClick(e)}>Delete</button>
    </div>
  )
}

export default ButtonGroup