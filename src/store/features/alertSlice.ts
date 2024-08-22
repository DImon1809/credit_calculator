import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Iinitialstate {
  alertText: string;
  isAlert: boolean;
  isAuthAlert: boolean;
}

const initialState: Iinitialstate = {
  alertText: "Внимание!",
  isAlert: false,
  isAuthAlert: false,
};

export const alertSlice = createSlice({
  name: "alertSlice",
  initialState,
  reducers: {
    toggleAlert: (
      state,
      action: PayloadAction<{
        alertText?: string;
        isAlert: boolean;
        isAuthAlert: boolean;
      }>
    ) => {
      if (action.payload?.alertText) state.alertText = action.payload.alertText;

      state.isAuthAlert = action.payload.isAuthAlert;
      state.isAlert = action.payload.isAlert;
    },
  },
});

export const { toggleAlert } = alertSlice.actions;
export const alertSliceReducer = alertSlice.reducer;
