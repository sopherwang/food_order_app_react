import classes from './Cart.module.css'
import Modal from "../common/Modal";
import {useContext, useEffect, useState} from 'react'
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use_http";

const Cart = (props) => {
  const cartCtx = useContext(CartContext)
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
  const hasItems = cartCtx.items.length > 0

  const [isCheckout, setIsCheckout] = useState(false)

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

  const orderHandler = () => {
    setIsCheckout(true)
  }

  const {isLoading, error, sendRequest} = useHttp()

  const submitOrderHandler = async (userData) => {
    await sendRequest({
      url: 'https://react-http-demo-cf6f3-default-rtdb.firebaseio.com/order.json',
      method: 'POST',
      body: {
        user: userData,
        orderedItems: cartCtx.items
      }
    }, (data) => {
    })
    props.onHideCart()
    cartCtx.reset()
  }

  const modalActions = <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
    {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
  </div>

  return <Modal onClose={props.onHideCart}>
    {cartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
    {isCheckout && <Checkout onHideCart={props.onHideCart} onConfirm={submitOrderHandler}/>}
    {!isCheckout && modalActions}
  </Modal>
}

export default Cart