import React, { useState } from "react";
import styles from "./Form.module.css";
import axios from "axios";

const serverBase = process.env.REACT_APP_SERVERURL || "http://localhost:5000";

function is_url(str) {
  let exp = new RegExp(
    /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
  );
  return exp.test(str);
}

function fix_url(url) {
  if (url.substring(0, 7) === "http://" || url.substring(0, 8) === "https://") {
    return url;
  } else {
    return `http://${url}`;
  }
}

export default function Form(props) {
  const [inputURL, setInputURL] = useState("");

  const handleChange = (event) => {
    setInputURL(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    props.setErrMsg(null);
    props.setLoading(true);

    if (!is_url(inputURL)) {
      props.setLoading(false);
      props.setErrMsg("Unable to shorten that link. It is not a valid URL.");
      return;
    }

    const longURL = fix_url(inputURL);
    const postData = { full: longURL };

    axios
      .post(`${serverBase}/short`, postData)
      .then((res) => props.setFetchedData(res.data[0]))
      .catch((err) => {
        props.setErrMsg("Something Went Wrong.");
        props.setLoading(false);
        console.error(err);
      });

    setTimeout(() => {
      props.setLoading(false);
      setInputURL("");
    }, 1000);
  }

  return (
    <form
      className={styles.formstyle}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div className={styles.textfieldContainer}>
        <input
          className={styles.textfieldStyle}
          required
          type="url"
          onChange={handleChange}
          value={inputURL}
          placeholder="Enter a URL"
        />
        <button className={styles.shortenButton} type="submit">
          Shorten
        </button>
      </div>
    </form>
  );
}
