import React, { useState } from "react";
import Form from "../Form/Form";
import Table from "../Table/Table";

import styles from "./Container.module.css";

export default function Container() {
  const [isLoading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);

  return (
    <div className={styles.container}>
      <Form
        setLoading={setLoading}
        setErrMsg={setErrMsg}
        setFetchedData={setFetchedData}
      />

      {isLoading && (
        <img className={styles.spinner} src="/preloader.gif" alt="Loading..." />
      )}

      {errMsg && <p className={styles.err}>{errMsg}</p>}

      {!isLoading && !errMsg && fetchedData && (
        <Table full={fetchedData.full} short={fetchedData.short} />
      )}
    </div>
  );
}
