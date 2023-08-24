import { configureStore } from "@reduxjs/toolkit";
import additionalInformationSlice from "../features/additionalInformation/additionalInformationSlice";
import { apiSlice } from "../features/api/api";
import authSlice from "../features/auth/authSlice";
import companySlice from "../features/companySlice/companySlice";
import SearchApplicantSlice from "../features/emplyeerSlice/SearchApplicantSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    authSlice,
    additionalInformationSlice: additionalInformationSlice,
    companySlice: companySlice,
    SearchApplicant: SearchApplicantSlice,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});

export default store;
