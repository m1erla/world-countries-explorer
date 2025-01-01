import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Country } from "../../types/country";
import { api } from "../../services/api";

interface CountriesState {
  data: Country[];
  filteredData: Country[];
  selectedContinent: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// localStorage'dan başlangıç durumunu al
const loadInitialState = (): Partial<CountriesState> => {
  try {
    const savedState = localStorage.getItem('countries_state');
    return savedState ? JSON.parse(savedState) : {};
  } catch (error) {
    console.error("Error loading initial state:", error);
    return {};
  }
};

const initialState: CountriesState = {
  data: [],
  filteredData: [],
  selectedContinent: "All",
  status: "idle",
  error: null,
  ...loadInitialState()
};

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async () => {
    try {
      return await api.getAllCountries();
    } catch (error: any) {
      throw error;
    }
  }
);

const filterCountriesByContinent = (countries: Country[], continent: string): Country[] => {
  if (continent === "All") return countries;
  return countries.filter(country => country.continent === continent);
};

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setSelectedContinent: (state, action) => {
      state.selectedContinent = action.payload;
      state.filteredData = filterCountriesByContinent(state.data, action.payload);
      // State'i localStorage'a kaydet
      try {
        localStorage.setItem('countries_state', JSON.stringify({
          selectedContinent: action.payload,
          filteredData: state.filteredData
        }));
      } catch (error) {
        console.error("Error saving state:", error);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        if (state.status === "idle") {
          state.status = "loading";
        }
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.filteredData = filterCountriesByContinent(action.payload, state.selectedContinent);
        state.error = null;
        // Başarılı veri çekme sonrası state'i kaydet
        try {
          localStorage.setItem('countries_state', JSON.stringify({
            data: state.data,
            filteredData: state.filteredData,
            selectedContinent: state.selectedContinent
          }));
        } catch (error) {
          console.error("Error saving state:", error);
        }
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Bir hata oluştu";
      });
  },
});

export const { setSelectedContinent } = countriesSlice.actions;
export default countriesSlice.reducer; 