import classes from './MealItem.module.css'
import MealItemForm from "./MealItemForm";
import {useDispatch} from "react-redux";
import {cartActions} from "../../store/cart_slice";
import React from "react";
import MealModel from "../../models/MealModel";

const MealItem: React.FC<MealModel> = props => {
    const dispatch = useDispatch()
    const price = `$${props.price.toFixed(2)}`

    const addToCartHandler = (amount: number) => {
        dispatch(cartActions.addToCart({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        }))
    }

    return <li className={classes.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
        </div>
        <div>
            <MealItemForm id={props.id} onAddToCart={addToCartHandler}/>
        </div>
    </li>
}

export default MealItem