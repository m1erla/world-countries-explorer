import React from "react";
import styles from "./SearchAndFilter.module.css";

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOrder: "asc" | "desc";
  onSortChange: (order: "asc" | "desc") => void;
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
        <span className={styles.searchIcon}>🔍</span>
      </div>

      <div className={styles.sortBox}>
        <label>Sort by population:</label>
        <select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value as "asc" | "desc")}
          className={styles.sortSelect}
        >
          <option value="desc">Highest to Lowest</option>
          <option value="asc">Lowest to Highest</option>
        </select>
      </div>
    </div>
  );
};

export default SearchAndFilter;
