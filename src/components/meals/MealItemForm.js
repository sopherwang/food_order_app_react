import classes from './MealItemForm.module.css'
import Input from "../common/Input";
import {useRef, useState} from 'react'

const MealItemForm = props => {
  const [amountIsValid, setAmountIsValid] = useState(true)
  const amountInputRef = useRef()

  const submitHandler = event => {
    event.preventDefault()
    const enteredAmount = amountInputRef.current.value
    const amount = +enteredAmount
    if (enteredAmount.trim().length === 0 || amount < 1 || amount > 5) {
      setAmountIsValid(false)
      return
    }
    props.onAddToCart(amount)
  }

  return <form className={classes.form} onSubmit={submitHandler}>
    <Input ref={amountInputRef} label='Amount' input={{
      id: 'amount_' + props.id,
      type: 'number',
      min: '1',
      max: '5',
      step: '1',
      defaultValue: '1',
    }}/>
    <button type='submit'>+ Add</button>
    {!amountIsValid && <p>Please enter a valid amount (1 - 5)</p>}
  </form>
}

export default MealItemForm