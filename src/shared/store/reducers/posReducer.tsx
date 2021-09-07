import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  products: [],
  cart: [],
  totalCartAmount: 0,
  totalTax: 0,
};

export const posSlice = createSlice({
  name: 'pos',
  initialState,
  reducers: {
    resetPos: state => initialState,
    addProductToCart: (state, action) => {
      const objToPush = {...action.payload};
      objToPush.count = 1;
      console.log('----price----', parseInt(action.payload.price));
      state.totalCartAmount =
        state.totalCartAmount + parseInt(action.payload.price);
      state.totalTax = state.totalTax + parseInt(action.payload.tax);
      state.cart.push(objToPush);
    },
    removeItemFromCart: (state, action) => {
      const cartData = [...state.cart];

      cartData.splice(
        cartData.findIndex(item => item._id === action.payload._id),
        1,
      );
      state.totalCartAmount -= parseInt(action.payload.price);
      state.totalTax -= parseInt(action.payload.tax);
      state.cart = cartData;
    },

    increaseItemCount: (state, action) => {
      let cartData = [...state.cart];
      const ind = cartData.findIndex(item => item._id === action.payload._id);
      console.log('----price----', action.payload.price);
      state.totalCartAmount += parseInt(action.payload.price);
      state.totalTax += parseInt(action.payload.tax);

      cartData[ind].count += 1;
      state.cart = cartData;
    },

    decreaseItemCount: (state, action) => {
      let cartData = [...state.cart];
      const ind = cartData.findIndex(item => item._id === action.payload._id);

      if (cartData[ind].count > 1) {
        cartData[ind].count -= 1;
        state.totalCartAmount -= parseInt(action.payload.price);
        state.totalTax -= parseInt(action.payload.tax);
      }
      state.cart = cartData;
    },
  },
});

export const {
  resetPos,
  addProductToCart,
  removeItemFromCart,
  increaseItemCount,
  decreaseItemCount,
} = posSlice.actions;

export default posSlice.reducer;
