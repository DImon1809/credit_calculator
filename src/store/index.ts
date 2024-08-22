import { configureStore } from "@reduxjs/toolkit";

import { alertSliceReducer } from "./features/alertSlice";
import { gWrapperSliceReducer } from "./features/gWrapperslice";

export const store = configureStore({
  reducer: {
    alertSlice: alertSliceReducer,
    gWrapperSlice: gWrapperSliceReducer,
  },
});

export type RootType = ReturnType<typeof store.getState>;
