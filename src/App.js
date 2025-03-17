import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Container from "./components/Container/Container";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.container}>
      <Navbar />
      <Container />
    </div>
  );
}

export default App;
