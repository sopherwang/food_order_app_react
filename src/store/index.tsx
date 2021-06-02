import cartReducer from './cart_slice'
import uiReducer from './ui-slice'
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    ui: uiReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>

export default store