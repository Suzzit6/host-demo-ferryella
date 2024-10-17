import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice.js';
import WishListReducer from "./wishlistSlice.js"
// import orderReducer from './orderslice.js';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist:WishListReducer
    // order: orderReducer,
  },
});

export default store;