import React from "react";
import { useNavigate } from "react-router-dom";
import type { Country } from "../types/country";
import styles from "./CountryModal.module.css";

interface CountryModalProps {
  country: Country;
  onClose: () => void;
}

export const CountryModal: React.FC<CountryModalProps> = ({
  country,
  onClose,
}) => {
  const navigate = useNavigate();
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const handleLearnMore = () => {
    onClose();
    navigate(`/country/${encodeURIComponent(country.name)}`);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <div className={styles.content}>
          <div className={styles.header}>
            <img
              src={country.flag}
              alt={`${country.name} flag`}
              className={styles.flag}
            />
            <div className={styles.titleSection}>
              <h2 className={styles.title}>{country.name}</h2>
              <p className={styles.continent}>
                {country.continent}
                <span className={styles.emoji}>
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
              </p>
            </div>
          </div>

          <div className={styles.grid}>
            <div className={styles.infoSection}>
              <h3>General Information</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <strong>Capital</strong>
                  <span>{country.capital || "N/A"}</span>
                </div>
                <div className={styles.infoItem}>
                  <strong>Population</strong>
                  <span>{formatNumber(country.population)}</span>
                </div>
                <div className={styles.infoItem}>
                  <strong>Languages</strong>
                  <span>{country.languages.join(", ") || "N/A"}</span>
                </div>
              </div>
            </div>

            <div className={styles.infoSection}>
              <h3>Currency</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <strong>Name</strong>
                  <span>{country.currency.name || "N/A"}</span>
                </div>
                <div className={styles.infoItem}>
                  <strong>Code</strong>
                  <span>{country.currency.code || "N/A"}</span>
                </div>
                <div className={styles.infoItem}>
                  <strong>Symbol</strong>
                  <span>{country.currency.symbol || "N/A"}</span>
                </div>
              </div>
            </div>

            <div className={styles.infoSection}>
              <h3>Economic Indicators</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <strong>Minimum Wage</strong>
                  <span>
                    ${formatNumber(country.economicIndicators.minimumWage)}
                    /month
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <strong>Average Salary</strong>
                  <span>
                    ${formatNumber(country.economicIndicators.averageSalary)}
                    /month
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <strong>Unemployment Rate</strong>
                  <span>
                    {country.economicIndicators.unemploymentRate.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.infoSection}>
              <h3>Location</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <strong>Latitude</strong>
                  <span>{country.coordinates.latitude.toFixed(2)}°</span>
                </div>
                <div className={styles.infoItem}>
                  <strong>Longitude</strong>
                  <span>{country.coordinates.longitude.toFixed(2)}°</span>
                </div>
              </div>
            </div>
          </div>

          <button className={styles.learnMoreButton} onClick={handleLearnMore}>
            <span className={styles.buttonText}>Learn More</span>
            <span className={styles.buttonIcon}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
