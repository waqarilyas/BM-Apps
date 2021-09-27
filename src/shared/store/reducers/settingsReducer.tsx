import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  language: 'English',
  currency: 'USD',
  defaultTaxRate: '0',
  darkMode: false,
  faceId: false,
  thumbEnabled: false,
  taxEnabled: false,
};
export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    resetSettings: () => initialState,
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setThumbEnabled: (state, action) => {
      state.thumbEnabled = action.payload;
    },
    setTaxEnabled: (state, action) => {
      state.taxEnabled = action.payload;
    },
  },
});

export const {
  setCurrency,
  setLanguage,
  resetSettings,
  setThumbEnabled,
  setTaxEnabled,
} = settingsSlice.actions;

export default settingsSlice.reducer;
