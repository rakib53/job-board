import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobTitle: "",
  location: "",
};

const searchInputSlice = createSlice({
  name: "searchJob",
  initialState,
  reducers: {
    setSearchJobTitle: (state, action) => {
      state.jobTitle = action.payload;
    },
    setSearchJobLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { setSearchJobTitle, setSearchJobLocation } =
  searchInputSlice.actions;
export default searchInputSlice.reducer;
