import classes from './Cart.module.css'
import Modal from "../common/Modal";
import {useState} from 'react'
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use_http";
import {useDispatch, useSelector} from "react-redux";
import {cartActions} from "../../store/cart_slice";

const Cart = (props) => {
  const dispatch = useDispatch()
  const items = useSelector(state => state.cart.items)
  const totalAmountData = useSelector(state => state.cart.totalAmount)
  const totalAmount = `$${totalAmountData.toFixed(2)}`
  const hasItems = items.length > 0

  const [isCheckout, setIsCheckout] = useState(false)

  const cartItemRemoveHandler = id => {
    dispatch(cartActions.removeFromCart(id))
  }

  const cartItemAddHandler = item => {
    dispatch(cartActions.addToCart({...item, amount: 1}))
  }

  const cartItems = <ul className={classes['cart-items']}>{
    items.map(cart => <CartItem key={cart.id}
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
        orderedItems: items
      }
    }, (data) => {
    })
    props.onHideCart()
    dispatch(cartActions.reset())
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