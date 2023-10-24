import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userNameSearchText: "",
};

const SearchApplicantSlice = createSlice({
  name: "SearchApplicant",
  initialState,
  reducers: {
    setSearchUserNameInput: (state, action) => {
      state.userNameSearchText = action.payload;
    },
  },
});

export const { setSearchUserNameInput } = SearchApplicantSlice.actions;
export default SearchApplicantSlice.reducer;
