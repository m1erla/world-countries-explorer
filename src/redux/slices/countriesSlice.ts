import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Country } from "../../types/country";

interface CountriesState {
  data: Country[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CountriesState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }
    const data = await response.json();
    return data.map((country: any) => {
      const currencyKey = country.currencies ? Object.keys(country.currencies)[0] : null;
      const currencyInfo = currencyKey ? country.currencies[currencyKey] : null;

      return {
        name: country.name.common,
        capital: country.capital?.[0] || "N/A",
        population: country.population,
        continent: country.region,
        languages: Object.values(country.languages || {}),
        flag: country.flags.svg,
        area: country.area,
        currencies: Object.values(country.currencies || {}).map((curr: any) => curr.name),
        timezones: country.timezones,
        currency: currencyInfo ? {
          name: currencyInfo.name,
          code: currencyKey,
          symbol: currencyInfo.symbol
        } : {
          name: "N/A",
          code: "N/A",
          symbol: "N/A"
        },
        coordinates: {
          latitude: country.latlng?.[0] || 0,
          longitude: country.latlng?.[1] || 0
        }
      };
    });
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
        state.data = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default countriesSlice.reducer; 