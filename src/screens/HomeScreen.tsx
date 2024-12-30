import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CountryCard } from "../components/CountryCard";
import { CountryModal } from "../components/CountryModal";
import type { Country } from "../types/country";
import { fetchCountries } from "../redux/slices/countriesSlice";
import { toggleTheme } from "../redux/slices/themeSlice";
import type { AppDispatch, RootState } from "../redux/store";

const continents = [
  { id: "africa", name: "Africa", emoji: "🌍" },
  { id: "asia", name: "Asia", emoji: "🌏" },
  { id: "europe", name: "Europe", emoji: "🌍" },
  { id: "north-america", name: "North America", emoji: "🌎" },
  { id: "south-america", name: "South America", emoji: "🌎" },
  { id: "oceania", name: "Oceania", emoji: "🌏" },
  { id: "antarctica", name: "Antarctica", emoji: "🌍" },
];

export const HomeScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: countries,
    status,
    error,
  } = useSelector((state: RootState) => state.countries);
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const [selectedContinent, setSelectedContinent] = useState<string>("all");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCountries());
    }
  }, [dispatch, status]);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  const filteredCountries =
    selectedContinent === "all"
      ? countries
      : countries.filter((country) => {
          const normalizedContinent = country.continent
            .toLowerCase()
            .replace(/\s+/g, "-");
          return normalizedContinent === selectedContinent;
        });

  return (
    <>
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          <span style={{ fontSize: "2rem" }}>🌍</span>
          <h1>World Countries Explorer</h1>
        </a>
        <div className="continents-nav">
          <a
            href="#"
            className={`continent-link ${
              selectedContinent === "all" ? "active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              setSelectedContinent("all");
            }}
          >
            All
          </a>
          {continents.map((continent) => (
            <a
              key={continent.id}
              href="#"
              className={`continent-link ${
                selectedContinent === continent.id ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                setSelectedContinent(continent.id);
              }}
            >
              {continent.emoji} {continent.name}
            </a>
          ))}
        </div>
        <button
          className="theme-toggle"
          onClick={() => dispatch(toggleTheme())}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? "🌞" : "🌙"}
        </button>
      </nav>

      <main className="main-content">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "2rem",
            padding: "1rem",
          }}
        >
          {status === "loading" ? (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "4rem",
                color: "var(--text-color)",
              }}
            >
              <h2>Loading...</h2>
              <p>Please wait</p>
            </div>
          ) : status === "failed" ? (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "4rem",
                color: "var(--text-color)",
              }}
            >
              <h2>Error!</h2>
              <p>{error}</p>
            </div>
          ) : filteredCountries.length === 0 ? (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "4rem",
                color: "var(--text-color)",
              }}
            >
              <h2>No Countries Found</h2>
              <p>Please try selecting a different continent</p>
            </div>
          ) : (
            filteredCountries.map((country) => (
              <CountryCard
                key={country.id}
                country={country}
                onPress={(country) => setSelectedCountry(country)}
              />
            ))
          )}
        </div>
      </main>

      {selectedCountry && (
        <CountryModal
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
        />
      )}
    </>
  );
};
