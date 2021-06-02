import React, {useState} from "react";

const useInput = (validateValue: (s: string) => boolean) => {
  const [enteredValue, setEnteredValue] = useState('')
  const [isTouched, setIsTouched] = useState(false)

  const valueIsValid = validateValue(enteredValue)
  const hasError = !valueIsValid && isTouched

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value)
  }

  const valueBlurHandler = () => {
    setIsTouched(true)
  }

  const reset = () => {
    setEnteredValue('')
    setIsTouched(false)
  }

  return {
    value: enteredValue,
    hasError: hasError,
    isValid: valueIsValid,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  }
}

export default useInput