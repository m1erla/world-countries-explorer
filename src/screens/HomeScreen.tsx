import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./HomeScreen.module.css";
import SearchAndFilter from "../components/SearchAndFilter";
import { CountryCard } from "../components/CountryCard";
import { CountryModal } from "../components/CountryModal";
import { RootState, AppDispatch } from "../redux/store";
import { fetchCountries } from "../redux/slices/countriesSlice";
import { toggleTheme } from "../redux/slices/themeSlice";
import type { Country } from "../types/country";

export const HomeScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedContinent, setSelectedContinent] = useState<string | null>(
    null
  );
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const { data: countries, status } = useSelector(
    (state: RootState) => state.countries
  );
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  const filteredAndSortedCountries = useMemo(() => {
    let result = [...countries];

    // Continent filtering
    if (selectedContinent) {
      result = result.filter(
        (country) => country.continent === selectedContinent
      );
    }

    // Search filtering
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (country) =>
          country.name.toLowerCase().includes(query) ||
          country.capital?.toLowerCase().includes(query) ||
          country.languages.some((lang) => lang.toLowerCase().includes(query))
      );
    }

    // Population sorting
    result.sort((a, b) => {
      const comparison = a.population - b.population;
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [countries, selectedContinent, searchQuery, sortOrder]);

  const continents = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  if (status === "loading") {
    return (
      <div className={styles.loadingContainer}>
        <p>Loading countries...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>World Countries Explorer</h1>
        <button
          className={styles.themeToggle}
          onClick={() => dispatch(toggleTheme())}
        >
          {isDark ? "🔆" : "🌙"}
        </button>
      </div>

      <SearchAndFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      <div className={styles.continentScroll}>
        <button
          className={`${styles.continentButton} ${
            !selectedContinent ? styles.selectedContinent : ""
          }`}
          onClick={() => setSelectedContinent(null)}
        >
          All
        </button>
        {continents.map((continent) => (
          <button
            key={continent}
            className={`${styles.continentButton} ${
              selectedContinent === continent ? styles.selectedContinent : ""
            }`}
            onClick={() => setSelectedContinent(continent)}
          >
            {continent}
          </button>
        ))}
      </div>

      <div className={styles.countriesContainer}>
        {filteredAndSortedCountries.map((country) => (
          <CountryCard
            key={country.name}
            country={country}
            onPress={(country) => setSelectedCountry(country)}
          />
        ))}
        {filteredAndSortedCountries.length === 0 && (
          <div className={styles.noResults}>
            <p>No results found</p>
            <small>
              Please try a different search term or clear the filters
            </small>
          </div>
        )}
      </div>
      {selectedCountry && (
        <CountryModal
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
        />
      )}
    </div>
  );
};
