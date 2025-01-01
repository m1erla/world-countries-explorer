import React from "react";
import styles from "./SearchAndFilter.module.css";

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOrder: "asc" | "desc" | "alphabetical" | "tourists";
  onSortChange: (order: "asc" | "desc" | "alphabetical" | "tourists") => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  onSearchChange,
  sortOrder,
  onSortChange,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search countries..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.searchInput}
        />
        <svg
          className={styles.searchIcon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>

      <div className={styles.sortBox}>
        <label>Sort by:</label>
        <select
          value={sortOrder}
          onChange={(e) =>
            onSortChange(
              e.target.value as "asc" | "desc" | "alphabetical" | "tourists"
            )
          }
          className={styles.sortSelect}
        >
          <option value="tourists">Most Visited</option>
          <option value="alphabetical">A to Z</option>
          <option value="desc">Population (High to Low)</option>
          <option value="asc">Population (Low to High)</option>
        </select>
      </div>
    </div>
  );
};

export default SearchAndFilter;
