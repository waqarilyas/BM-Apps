import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  products: [],
  cart: [],
  totalCartAmount: 0,
  totalTax: 0,
  customPrice: null,
  contacts: [],
};

export const posSlice = createSlice({
  name: 'pos',
  initialState,
  reducers: {
    resetPos: state => initialState,
    addProductToCart: (state, action) => {
      const objToPush = {...action.payload};
      objToPush.count = 1;
      state.totalCartAmount =
        state.totalCartAmount + parseFloat(action.payload.price);
      state.totalTax = state.totalTax + parseFloat(action.payload.tax);
      state.cart.push(objToPush);
    },
    removeItemFromCart: (state, action) => {
      const cartData = [...state.cart];

      const ind = cartData.findIndex(item => item._id === action.payload._id);
      const count = cartData[ind]?.count;
      cartData.splice(ind, 1);

      state.totalCartAmount -= parseFloat(action.payload.price) * count;
      state.totalTax -= parseFloat(action.payload.tax) * count;
      state.cart = cartData;
    },

    increaseItemCount: (state, action) => {
      let cartData = [...state.cart];
      const ind = cartData.findIndex(item => item._id === action.payload._id);
      state.totalCartAmount += parseFloat(action.payload.price);
      state.totalTax += parseFloat(action.payload.tax);

      cartData[ind].count += 1;
      state.cart = cartData;
    },

    decreaseItemCount: (state, action) => {
      let cartData = [...state.cart];
      const ind = cartData.findIndex(item => item._id === action.payload._id);

      if (cartData[ind].count > 1) {
        cartData[ind].count -= 1;
        state.totalCartAmount -= parseFloat(action.payload.price);
        state.totalTax -= parseFloat(action.payload.tax);
      }
      state.cart = cartData;
    },
    setCustomPrice: (state, action) => {
      state.customPrice = action.payload;
    },
    resetCart: state => {
      state.cart = [];
      state.totalCartAmount = 0;
      state.totalTax = 0;
      state.customPrice = null;
    },
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
  },
});

export const {
  resetPos,
  addProductToCart,
  removeItemFromCart,
  increaseItemCount,
  decreaseItemCount,
  setCustomPrice,
  resetCart,
  addContact,
} = posSlice.actions;

export default posSlice.reducer;
