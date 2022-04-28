import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalQuantity: 0 },
  reducers: {
    additem(state, action) {
      const newItem = action.payload;
      const exsitingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!exsitingItem) {
        state.items.push({
          name: newItem.title,
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        exsitingItem.quantity++;
        exsitingItem.totalPrice = exsitingItem.totalPrice + newItem.price;
      }
    },
    removeItem(state, action) {
      state.totalQuantity--;
      const id = action.payload;
      const exsistingItem = state.items.find((item) => item.id === id.id);
      if (exsistingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id.id);
      } else {
        exsistingItem.quantity--;
        exsistingItem.totalPrice =
          exsistingItem.totalPrice - exsistingItem.price;
      }
    },
  },
});

export const cartSliceActions = cartSlice.actions;

export default cartSlice;
