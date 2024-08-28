import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IinitialState {
  jwtToken: string;
  isAuth: boolean;
}

const initialState: IinitialState = {
  jwtToken: "",
  isAuth: false,
};

export const useSlice = createSlice({
  name: "useSlice",
  initialState,
  reducers: {
    toggleUserData: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { toggleUserData } = useSlice.actions;
export const useSliceReducer = useSlice.reducer;
