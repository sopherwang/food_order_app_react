import classes from './Checkout.module.css'
import useInput from "../../hooks/use_input";

const Checkout = (props) => {
  const {
    value: enteredName,
    hasError: nameInputIsInvalid,
    isValid: enteredNameIsValid,
    valueChangeHandler: nameInputChangeHandler,
    valueBlurHandler: nameInputBlurHandler,
    reset: nameReset,
  } = useInput(value => value.trim().length > 0)

  let formIsValid = false;
  if (enteredNameIsValid) {
    formIsValid = true
  }

  const nameInputClasses = `${classes.control} ${nameInputIsInvalid ? classes.invalid : ''}`

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid) {
      return
    }

    props.onConfirm({
      name: enteredName,
    })
    nameReset()
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name'
               value={enteredName}
               onChange={nameInputChangeHandler}
               onBlur={nameInputBlurHandler}/>
        {nameInputIsInvalid && <p className='error-text'>Name must not be empty</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street'/>
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal'/>
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city'/>
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onHideCart}>
          Cancel
        </button>
        <button disabled={!formIsValid} className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;