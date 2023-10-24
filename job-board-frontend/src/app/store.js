import { configureStore } from "@reduxjs/toolkit";
import additionalInformationSlice from "../features/additionalInformation/additionalInformationSlice";
import { apiSlice } from "../features/api/api";
import authSlice from "../features/auth/authSlice";
import companySlice from "../features/companySlice/companySlice";
import SearchApplicantSlice from "../features/emplyeerSlice/SearchApplicantSlice";
import resumeSlice from "../features/resumeSlice/resumeSlice";
import searchInputSlice from "../features/searchInputSlice/searchInputSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    authSlice,
    additionalInformationSlice: additionalInformationSlice,
    companySlice: companySlice,
    SearchApplicant: SearchApplicantSlice,
    resumeSlice: resumeSlice,
    searchInputSlice: searchInputSlice,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});

export default store;
