import classes from './Cart.module.css'
import Modal from "../common/Modal";

const Cart = (props) => {
  const cartItems = <ul className={classes['cart-items']}>{
    [
      {
        id: 'c1',
        name: 'Sushi',
        amount: 2,
        price: 12.99,
      }
    ].map(cart => <li>{cart.name}</li>)
  }</ul>

  return <Modal onClose={props.onHideCart}>
    {cartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>25.99</span>
    </div>
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
      <button className={classes.button}>Order</button>
    </div>
  </Modal>
}

export default Cart