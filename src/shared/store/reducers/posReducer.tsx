import {createSlice} from '@reduxjs/toolkit';
import {calculateTax} from '../../services/helper.service';

const initialState = {
  products: [],
  cart: [],
  totalCartAmount: 0,
  totalTax: 0,
  customPrice: null,
  contacts: [],
  APFee: 0,
  totalTaxAmount: 0,
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

      state.totalTaxAmount =
        state.totalTaxAmount +
        calculateTax(action.payload.price, action.payload.tax);
      state.totalTax = state.totalTax + parseFloat(action.payload.tax);
      state.cart.push(objToPush);
    },
    removeItemFromCart: (state, action) => {
      const cartData = [...state.cart];

      const ind = cartData.findIndex(item => item._id === action.payload._id);
      const count = cartData[ind]?.count;
      cartData.splice(ind, 1);

      state.totalCartAmount -= parseFloat(action.payload.price) * count;
      state.totalTaxAmount -= calculateTax(
        parseFloat(action.payload.price) * count,
        parseFloat(action.payload.tax),
      );
      state.totalTax -= parseFloat(action.payload.tax) * count;
      state.cart = cartData;

      if (state.cart.length > 0) {
        state.totalCartAmount = 0;
        state.totalTax = 0;
        state.totalTaxAmount = 0;
      }
    },
    increaseItemCount: (state, action) => {
      let cartData = [...state.cart];
      const ind = cartData.findIndex(item => item._id === action.payload._id);
      state.totalCartAmount += parseFloat(action.payload.price);
      state.totalTax += parseFloat(action.payload.tax);
      state.totalTaxAmount += calculateTax(
        parseFloat(action.payload.price),
        parseFloat(action.payload.tax),
      );
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
        state.totalTaxAmount -= calculateTax(
          parseFloat(action.payload.price),
          parseFloat(action.payload.tax),
        );
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
      state.APFee = 0;
      state.totalTaxAmount = 0;
    },
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    setAPFee: (state, action) => {
      state.APFee = action.payload;
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
  setAPFee,
} = posSlice.actions;

export default posSlice.reducer;
