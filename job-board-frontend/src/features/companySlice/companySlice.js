import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companyInfo: {},
};

const companySlice = createSlice({
  name: "companyInfo",
  initialState,
  reducers: {
    getCompanyInfo: (state, action) => {
      state.companyInfo = action.payload;
    },
  },
});

export const { getCompanyInfo } = companySlice.actions;
export default companySlice.reducer;
