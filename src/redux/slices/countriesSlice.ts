import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Country } from "../../types/country";
import { api } from "../../services/api";

interface CountriesState {
  items: Country[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CountriesState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchCountries = createAsyncThunk(
  "countries/fetchAll",
  async () => {
    return await api.getAllCountries();
  }
);

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Bir hata oluştu";
      });
  },
});

export default countriesSlice.reducer; 