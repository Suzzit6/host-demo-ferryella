import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
import { Product } from '../view/product';
import axios from "axios";
// import { useUser } from "../contexts/authContext";
import { debounce } from 'lodash';


export const fetchWishlistData = createAsyncThunk(
  'cart/fetchWishlistData',
  async (userID, { rejectWithValue }) => {
    try {
      console.log("Fetching cart data for userID:", userID);
      const response = await axios.get(`http://localhost:5500/api/fetch-wishlist/${userID}`);
      console.log("Raw response  wishlist data:", response.data[0].userWishlist);
      
      if (response.data && Array.isArray(response.data[0]?.userWishlist)) {
        console.log("Array response wishlist:", response.data[0]?.userWishlist);

        return response.data[0]?.userWishlist || [];   
      } else if (response.data && response.data.userWishlist) {
        console.log("Object response wishlist:", response.data.userWishlist);

        return response.data.userWishlist;
      } else {

        console.log("Unexpected response structure wishlist");
        return [];
      }
    } catch (error) {

      console.error("Error fetching wishlist:", error);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);
  export const debouncedfetchWishlistData = debounce(
    (dispatch,userID) => {
      dispatch(fetchWishlistData(userID));
    },
    3000 
  );

const WishlistSlice = createSlice({
  name: 'wishlist',
  initialState: [],
  reducers: {
    addToWishlist: (state, action) => {

      state.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      const { itemid, sizeState } = action.payload;
      return state.filter(item => !(item.id === itemid && item.size === sizeState));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlistData.pending, (state) => {
        console.log("Fetching wishlist data...");
      })
      .addCase(fetchWishlistData.fulfilled, (state, action) => {
        console.log("Updating wishlist state with:", action.payload);
        return action.payload;
      })
      .addCase(fetchWishlistData.rejected, (state, action) => {
        console.log("Failed to fetch wishlist data:", action.error);
      })
      .addCase(removeFromWishlistAsync.fulfilled, (state, action) => {
        const { itemId, sizeState } = action.payload;
        return state.filter(item => !(item.id === itemId && item.size === sizeState));
      })
  },
});


export const removeFromWishlistAsync = createAsyncThunk(
  'cart/removeFromWishlistAsync',
  async (data) => {
    console.log("remove from wishlist data ",data.userId)
    try {

      // const { user } = getState(); // Assuming you have user state
      const response = await axios.post(`http://localhost:5500/api/remove-from-wishlist`, {
        data
      });
     console.log("response", response)
     const itemid = data.itemid
     const sizeState = data.sizeState

      return { itemid, sizeState };
        } catch (error) {

          console.log("error in remover wishlist async", error)
      // return rejectWithValue(error.response.data);
    }
  }
);



export const { addToWishlist, removeFromWishlist } = WishlistSlice.actions;
export default WishlistSlice.reducer;
