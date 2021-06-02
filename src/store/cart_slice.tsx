import {createSlice} from "@reduxjs/toolkit";
import CartModel from "../models/CartModel";

export type CartSliceStateObj = {
  items: CartModel[],
  totalAmount: number,
}

const defaultCartState: CartSliceStateObj = {
  items: [],
  totalAmount: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: defaultCartState,
  reducers: {
    replaceCart(state, action) {
      if(action.payload.items == null) {
        return
      }
      state.totalAmount = action.payload.totalAmount;
      state.items = action.payload.items;
    },
    addToCart(state, action) {
      const item = action.payload
      const updatedTotalAmount = state.totalAmount + item.price * item.amount
      const existingCartItemIndex = state.items.findIndex(element => element.id === item.id)
      const existingCartItem = state.items[existingCartItemIndex]
      let updatedItems;
      if (existingCartItem) {
        const updatedItem = {...existingCartItem, amount: existingCartItem.amount + item.amount}
        updatedItems = [...state.items]
        updatedItems[existingCartItemIndex] = updatedItem
      } else {
        updatedItems = state.items.concat(item)
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      }
    },
    removeFromCart(state, action) {
      const id = action.payload
      const existingCartItemIndex = state.items.findIndex(item => item.id === id)
      const existingCartItem = state.items[existingCartItemIndex]
      const updatedTotalAmount = state.totalAmount - existingCartItem.price
      let updatedItems;
      if (existingCartItem.amount === 1) {
        updatedItems = state.items.filter(item => item.id !== id)
      } else {
        const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1}
        updatedItems = [...state.items]
        updatedItems[existingCartItemIndex] = updatedItem
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      }
    },
    reset() {
      return defaultCartState
    },
  }
})

export const cartActions = cartSlice.actions
export default cartSlice.reducer