import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  isDark: boolean;
}

const getInitialTheme = (): boolean => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    return savedTheme === "dark";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const initialState: ThemeState = {
  isDark: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
      localStorage.setItem("theme", state.isDark ? "dark" : "light");
      document.documentElement.setAttribute(
        "data-theme",
        state.isDark ? "dark" : "light"
      );
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer; 