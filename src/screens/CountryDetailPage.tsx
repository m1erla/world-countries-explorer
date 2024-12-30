import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CountryDetailPage.module.css";
import { IoArrowBack } from "react-icons/io5";
import { getCountrySpecificInfo } from "./CountryDetailsScreen";

const CountryDetailPage: React.FC = () => {
  const { countryName, type, index } = useParams();
  const navigate = useNavigate();

  if (!countryName || !type || !index) {
    return <div>Information not found.</div>;
  }

  const countryInfo = getCountrySpecificInfo(countryName);
  let detailContent;
  let title = "";

  switch (type) {
    case "attraction":
      const attraction = countryInfo.attractions[parseInt(index)];
      title = attraction.name;
      detailContent = (
        <div className={styles.detailContent}>
          {attraction.image && (
            <img
              src={attraction.image}
              alt={attraction.name}
              className={styles.detailImage}
            />
          )}
          <h2>{attraction.name}</h2>
          <p className={styles.description}>{attraction.description}</p>
          {attraction.details && (
            <div className={styles.additionalInfo}>
              <h3>Detailed Information</h3>
              <p>{attraction.details}</p>
            </div>
          )}
        </div>
      );
      break;

    case "culture":
      const culture = countryInfo.culturalNotes[parseInt(index)];
      title = culture.title;
      detailContent = (
        <div className={styles.detailContent}>
          <h2>{culture.title}</h2>
          <p className={styles.description}>{culture.description}</p>
          {culture.details && (
            <div className={styles.additionalInfo}>
              <h3>Detailed Information</h3>
              <p>{culture.details}</p>
            </div>
          )}
        </div>
      );
      break;

    case "practical":
      const practical = countryInfo.practicalInfo[parseInt(index)];
      title = practical.title;
      detailContent = (
        <div className={styles.detailContent}>
          <h2>{practical.title}</h2>
          <p className={styles.description}>{practical.details}</p>
          {practical.additionalInfo && (
            <div className={styles.additionalInfo}>
              <h3>Additional Information</h3>
              <p>{practical.additionalInfo}</p>
            </div>
          )}
        </div>
      );
      break;

    default:
      detailContent = <div>Information not found.</div>;
  }

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </button>

      <div className={styles.header}>
        <h1>{countryName}</h1>
        <h2>{title}</h2>
      </div>

      {detailContent}
    </div>
  );
};

export default CountryDetailPage;
