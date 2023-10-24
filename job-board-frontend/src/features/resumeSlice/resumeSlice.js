import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  modalType: "",
  modalPropsValue: {},
  modalTitle: "",
};

const resumeSlice = createSlice({
  name: "resumeSlice",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.modalTitle = action.payload;
    },
    closeModal: (state, action) => {
      state.isModalOpen = false;
      state.modalTitle = "";
    },
    setModalType: (state, action) => {
      state.modalType = action.payload;
    },
    setModalPropsValue: (state, action) => {
      state.modalPropsValue = action.payload;
    },
  },
});

export const { openModal, closeModal, setModalType, setModalPropsValue } =
  resumeSlice.actions;
export default resumeSlice.reducer;
