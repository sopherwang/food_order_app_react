import Header from "./components/layout/Header";
import Meals from "./components/meals/Meals";
import Cart from "./components/cart/Cart";
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import Notification from "./components/common/Notification";
import {fetchCartData, sendCartData} from "./store/cart_actions";

let isInitial = true;

function App() {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const notification = useSelector(state => state.ui.notification)
  const [cartIsShown, setCartIsShown] = useState(false)

  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch])

  useEffect(() => {
    if (isInitial) {
      isInitial = false
      return
    }
    dispatch(sendCartData(cart))
  }, [dispatch, cart])

  const showCartHandler = () => {
    setCartIsShown(true)
  }

  const hideCartHandler = () => {
    setCartIsShown(false)
  }

  return (
    <>
      {cartIsShown && <Cart onHideCart={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      {notification && <Notification status={notification.status}
                                     title={notification.title} message={notification.message}/>}
      <main>
        <Meals/>
      </main>
    </>
  );
}

export default App;
