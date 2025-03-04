import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
  name: "company",
  initialState: {
    companies: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getCompanyStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCompanySuccess: (state, action) => {
      state.isFetching = false;
      state.companies = action.payload;
    },
    getCompanyFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteCompanyStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteCompanySuccess: (state, action) => {
      state.isFetching = false;
      state.companies.splice(
        state.companies.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteCompanyFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateCompanyStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateCompanySuccess: (state, action) => {
      state.isFetching = false;
      state.companies[
        state.companies.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.company;
    },
    updateCompanyFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //CREATE
    addCompanyStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addCompanySuccess: (state, action) => {
      state.isFetching = false;
      // Aynı ID'ye sahip şirketi filtrele ve yenisini ekle
      state.companies = state.companies.filter(
        (company) => company._id !== action.payload._id
      );
      state.companies.push(action.payload);
    },
    addCompanyFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getCompanyStart,
  getCompanySuccess,
  getCompanyFailure,
  deleteCompanyStart,
  deleteCompanySuccess,
  deleteCompanyFailure,
  updateCompanyStart,
  updateCompanySuccess,
  updateCompanyFailure,
  addCompanyStart,
  addCompanySuccess,
  addCompanyFailure,
} = companySlice.actions;

export default companySlice.reducer;
