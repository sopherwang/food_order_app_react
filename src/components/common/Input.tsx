import classes from './Input.module.css'
import React, {ForwardedRef} from 'react'

const Input = React.forwardRef((props: {
    input: {
        id: string
    },
    label: string
}, ref: ForwardedRef<HTMLInputElement>) => {
    return <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input ref={ref} {...props.input}/>
    </div>
})

export default Input