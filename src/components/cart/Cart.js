import classes from './Cart.module.css'
import Modal from "../common/Modal";
import {useContext} from 'react'
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext)
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
  const hasItems = cartCtx.items.length > 0

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id)
  }

  const cartItemAddHandler = item => {
    cartCtx.addItem({...item, amount: 1})
  }

  const cartItems = <ul className={classes['cart-items']}>{
    cartCtx.items.map(cart => <CartItem key={cart.id}
                                        name={cart.name} amount={cart.amount} price={cart.price}
                                        onRemove={cartItemRemoveHandler.bind(null, cart.id)}
                                        onAdd={cartItemAddHandler.bind(null, cart)}/>)
  }</ul>

  return <Modal onClose={props.onHideCart}>
    {cartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
      {hasItems && <button className={classes.button}>Order</button>}
    </div>
  </Modal>
}

export default Cart