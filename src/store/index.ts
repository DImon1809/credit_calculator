import { configureStore } from "@reduxjs/toolkit";

import { alertSliceReducer } from "./features/alertSlice";
import { gWrapperSliceReducer } from "./features/gWrapperslice";
import { useSliceReducer } from "./features/useSlice";

export const store = configureStore({
  reducer: {
    alertSlice: alertSliceReducer,
    gWrapperSlice: gWrapperSliceReducer,
    userSlice: useSliceReducer,
  },
});

export type RootType = ReturnType<typeof store.getState>;
