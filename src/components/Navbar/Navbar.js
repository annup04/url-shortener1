import React from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <nav className={styles.navbar}>
        <div className={styles.brandContainer}>
          <img src="/logo.png" alt="Logo" className={styles.logo} />
          <span className={styles.brandName}>URL-Shrotener</span>
        </div>
      </nav>
    </div>
  );
}
