import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  isCaptain: false,
  userData: null,
  captainData: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.isCaptain = action.payload.isCaptain;
      if (action.payload.isCaptain) {
        state.captainData = action.payload.captainData;
      } else {
        state.userData = action.payload.userData;
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.isCaptain = false;
      state.userData = null;
      state.captainData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
