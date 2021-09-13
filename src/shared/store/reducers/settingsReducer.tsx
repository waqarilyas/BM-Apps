import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  language: 'EN',
  currency: 'USD',
  defaultTaxRate: '0',
  darkMode: false,
  faceId: false,
  thumbEnabled: false,
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
  },
});

export const {setCurrency, setLanguage, resetSettings, setThumbEnabled} =
  settingsSlice.actions;

export default settingsSlice.reducer;
