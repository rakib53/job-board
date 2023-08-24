import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gender: ["🙋‍♂️ Male", "🙋‍♀️ Female", "🌈 Other"],
  employeeType: [
    "College Student",
    "Fresher",
    "Working professional",
    "School student",
    "Women returning to work",
  ],
  languages: [
    "English",
    "Hindi",
    "Bengali",
    "Spanish",
    "French",
    "German",
    "Arabic",
    "Urdu",
    "Porgugues",
  ],
  interestAreas: [
    "Sales",
    "Data Entry",
    "Digital marketing",
    "Graphic Design",
    "Marketing",
    "Human resources (HR)",
    "General management",
    "Social Media Marketing",
    "Finance",
    "Software Testing",
    "Web Development",
    "UI/UX Design",
    "3D Automation",
    "Data science",
    "Video Editing",
    "Content Writing",
    "Web Design",
  ],
  jobTypes: ["Internship", "Job"],
  jobWhereFrom: ["In-Office", "Work from home"],
  selectedGender: "",
  selectedEmployeeTypes: "",
  selectedLanguages: [],
  selectedInterests: [],
  selectedJobTypes: [],
  selectedJobWhereFrom: [],
};

const additionalInformationSlice = createSlice({
  name: "additionalInformation",
  initialState,
  reducers: {
    getSelectedGender: (state, action) => {
      state.selectedGender = action.payload;
    },
    getSelectedEmployeeType: (state, action) => {
      state.selectedEmployeeTypes = action.payload;
    },
    getSelectedLanguage: (state, action) => {
      if (state.selectedLanguages.includes(action.payload)) {
        state.selectedLanguages = state.selectedLanguages.filter(
          (item) => item !== action.payload
        );
      } else {
        state.selectedLanguages = [...state.selectedLanguages, action.payload];
      }
    },
    getSelectedInterest: (state, action) => {
      if (state.selectedInterests.includes(action.payload)) {
        state.selectedInterests = state.selectedInterests.filter(
          (item) => item !== action.payload
        );
      } else {
        state.selectedInterests = [...state.selectedInterests, action.payload];
      }
    },
    getSelectedJobTypes: (state, action) => {
      if (state.selectedJobTypes.includes(action.payload)) {
        state.selectedJobTypes = state.selectedJobTypes.filter(
          (item) => item !== action.payload
        );
      } else {
        state.selectedJobTypes = [...state.selectedJobTypes, action.payload];
      }
    },
    getSelectedJobWhereFrom: (state, action) => {
      if (state.selectedJobWhereFrom.includes(action.payload)) {
        state.selectedJobWhereFrom = state.selectedJobWhereFrom.filter(
          (item) => item !== action.payload
        );
      } else {
        state.selectedJobWhereFrom = [
          ...state.selectedJobWhereFrom,
          action.payload,
        ];
      }
    },
  },
});

export const {
  getSelectedGender,
  getSelectedEmployeeType,
  getSelectedLanguage,
  getSelectedInterest,
  getSelectedJobTypes,
  getSelectedJobWhereFrom,
} = additionalInformationSlice.actions;
export default additionalInformationSlice.reducer;
