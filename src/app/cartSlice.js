import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
import { Product } from '../view/product';
import axios from "axios";
// import { useUser } from "../contexts/authContext";
import { debounce } from 'lodash';


export const fetchCartData = createAsyncThunk(
  'cart/fetchCartData',
  async (userID, { rejectWithValue }) => {
    try {
      console.log("Fetching cart data for userID:", userID);
      const response = await axios.get(`http://localhost:5500/api/fetch-cart/${userID}`);
      console.log("Raw response data:", response.data);
      
      if (response.data && Array.isArray(response.data)) {
        console.log("Array response:", response.data[0]?.userCart);

        return response.data[0]?.userCart || [];   
      } else if (response.data && response.data.userCart) {
        console.log("Object response:", response.data.userCart);

        return response.data.userCart;
      } else {

        console.log("Unexpected response structure");
        return [];
      }
    } catch (error) {

      console.error("Error fetching cart:", error);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);
  export const debouncedFetchCartData = debounce(
    (dispatch,userID) => {
      dispatch(fetchCartData(userID));
    },
    3000 
  );

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {

      state.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const { itemid, sizeState } = action.payload;
      return state.filter(item => !(item.id === itemid && item.size === sizeState));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        console.log("Fetching cart data...");
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        console.log("Updating cart state with:", action.payload);
        return action.payload;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        console.log("Failed to fetch cart data:", action.error);
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        const { itemId, sizeState } = action.payload;
        return state.filter(item => !(item.id === itemId && item.size === sizeState));
      })
  },
});


export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCartAsync',
  async (data) => {
    console.log("remove from cart data ",data.userId)
    try {

      // const { user } = getState(); // Assuming you have user state
      const response = await axios.post(`http://localhost:5500/api/remove-from-cart`, {
        data
      });
     console.log("response", response)
     const itemid = data.itemid
     const sizeState = data.sizeState

      return { itemid, sizeState };
        } catch (error) {

          console.log("error in remover cart async", error)
      // return rejectWithValue(error.response.data);
    }
  }
);



export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
