import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("userToken") || null,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("userToken", action.payload);
    },
    logut: (state) => {
      localStorage.removeItem("userToken");
      state.user = {};
      state.token = null;
    },
    getUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setToken, logut, getUserInfo } = authSlice.actions;
export default authSlice.reducer;
