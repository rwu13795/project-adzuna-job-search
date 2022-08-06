import { memo, useState } from "react";

import SearchForm from "./SearchForm";
import SearchResult from "./SearchResult";

import styles from "./Search.module.css";

function Search(): JSX.Element {
  const [showForm, setShowForm] = useState<boolean>(true);

  function showFormHandler(show: boolean) {
    setShowForm(show);
  }

  return (
    <div className={styles.container}>
      <SearchForm showForm={showForm} showFormHandler={showFormHandler} />
      <SearchResult showForm={showForm} showFormHandler={showFormHandler} />
    </div>
  );
}

export default memo(Search);
