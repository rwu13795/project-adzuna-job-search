import { memo } from "react";

import SearchForm from "./SearchForm";
import SearchResult from "./SearchResult";

import styles from "./Search.module.css";

function Search(): JSX.Element {
  return (
    <div className={styles.container}>
      <SearchForm />
      <SearchResult />
    </div>
  );
}

export default memo(Search);
