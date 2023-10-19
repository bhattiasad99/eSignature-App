import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      return state;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      return state;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
