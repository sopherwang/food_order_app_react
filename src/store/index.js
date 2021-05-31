import cartReducer from './cart_slice'
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  }
})

export default store