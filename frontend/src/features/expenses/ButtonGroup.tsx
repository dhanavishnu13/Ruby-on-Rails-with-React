import {destoryExpenseAsync} from './expenseSlice' 

function ButtonGroup(props:any) {
    function handleClick(e:any){
        const isConfirmed = window.confirm('Are you sure you want to delete?');
        if (isConfirmed) {
        const payload={
            expense: {
                expense_id: props.expense_id
            }
        }
        props.dispatch(destoryExpenseAsync(payload))
    }
    }
  return (
    <div className='btn-group float'>
        <button className='btn btn-warning'
        onClick={()=>props.toggleEditform()}>Edit</button>
        <button className='btn btn-danger' onClick={(e)=>handleClick(e)}>Delete</button>
    </div>
  )
}

export default ButtonGroup