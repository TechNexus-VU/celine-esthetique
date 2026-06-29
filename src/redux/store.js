// Redux package
import { configureStore } from "@reduxjs/toolkit";

// Reducers
import authReducer from "@/redux/slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});