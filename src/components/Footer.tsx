import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        © {new Date().getFullYear()} World Countries Explorer. Developed by{" "}
        <a
          href="https://github.com/m1erla"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          m1erla
        </a>{" "}
        and Cursor
      </p>
    </footer>
  );
};

export default Footer;
