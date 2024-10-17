import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
import { Product } from '../view/product';
import axios from "axios";
// import { useUser } from "../contexts/authContext";
import { debounce } from 'lodash';


export const fetchOrdersData = createAsyncThunk(
  'order/fetchCartData',
  async (userID, { rejectWithValue }) => {
    try {
      console.log("Fetching cart data for userID:", userID);
      const response = await axios.get(`http://localhost:5500/api/fetch-cart/${userID}`);
      console.log("Raw response data:", response.data);
      
      if (response.data && Array.isArray(response.data)) {
        console.log("Array response:", response.data[0]?.userOrders);

        return response.data[0]?.userCart || [];   
      } else if (response.data && response.data.userCart) {
        console.log("Object response:", response.data.userOrders);

        return response.data.userOrders;
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
  export const debouncedFetchOrdersData = debounce(
    (dispatch,userID) => {
      dispatch(fetchOrdersData(userID));
    },
    3000 
  );

const OrderSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToOrders: (state, action) => {

      state.push(action.payload);
    },
    removeFromOrders: (state, action) => {
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
        console.log("Updating order state with:", action.payload);
        return action.payload;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        console.log("Failed to orders cart data:", action.error);
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        const { itemId, sizeState } = action.payload;
        return state.filter(item => !(item.id === itemId && item.size === sizeState));
      });
  },
});

export const { addToOrders, removeFromOrders } = cartSlice.actions;
export default OrderSlice.reducer;