import React from "react";
import type { Country } from "../types/country";
import styles from "./CountryCard.module.css";

interface CountryCardProps {
  country: Country;
  onPress: (country: Country) => void;
}

export const CountryCard: React.FC<CountryCardProps> = ({
  country,
  onPress,
}) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  return (
    <div className={styles.card} onClick={() => onPress(country)}>
      <div className={styles.imageContainer}>
        {country.flag && (
          <img
            src={country.flag}
            alt={`${country.name} flag`}
            className={styles.flag}
            loading="lazy"
          />
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>
          {country.name}
          <span style={{ fontSize: "1.25rem" }}>
            {country.continent === "Europe"
              ? "🇪🇺"
              : country.continent === "Asia"
              ? "🌏"
              : country.continent === "Africa"
              ? "🌍"
              : country.continent === "North America" ||
                country.continent === "South America"
              ? "🌎"
              : country.continent === "Oceania"
              ? "🏝️"
              : "🌍"}
          </span>
        </h3>

        <div className={styles.info}>
          <p>
            <strong>Capital:</strong>
            <span>{country.capital || "N/A"}</span>
          </p>
          <p>
            <strong>Population:</strong>
            <span>{formatNumber(country.population)}</span>
          </p>
          <p>
            <strong>Region:</strong>
            <span>{country.continent}</span>
          </p>
          {country.languages.length > 0 && (
            <p>
              <strong>Languages:</strong>
              <span>{country.languages.join(", ")}</span>
            </p>
          )}
        </div>

        <button className={styles.button}>
          <span>View Details</span>
          <span style={{ fontSize: "1.25rem" }}>→</span>
        </button>
      </div>
    </div>
  );
};
