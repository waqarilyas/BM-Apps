import {createSlice} from '@reduxjs/toolkit';

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    language: 'EN',
    currency: 'USD',
    defaultTaxRate: '0',
    darkMode: false,
    faceId: false,
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const {setCurrency, setLanguage} = settingsSlice.actions;

export default settingsSlice.reducer;
