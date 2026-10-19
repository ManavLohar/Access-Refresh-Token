import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../state/authReducers";

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
