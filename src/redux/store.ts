import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from './slices/countriesSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 