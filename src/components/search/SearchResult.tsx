import { memo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Button from "react-bootstrap/Button";

import { adzunaSearch } from "../../redux/map/extra-reducers/adzunaSearch";
import {
  clearResults,
  selectCurrentSearch,
  selectHasMore,
} from "../../redux/map/mapSlice";
import { searchResultTransition } from "../../utils";

import styles from "./SearchResult.module.css";

function SearchResult(): JSX.Element {
  const dispatch = useAppDispatch();

  const hasMore = useAppSelector(selectHasMore);
  const currentSearch = useAppSelector(selectCurrentSearch);

  const [pageNum, setPageNum] = useState<number>(1);

  function pageChangeHandler() {
    dispatch(adzunaSearch({ pageNum: pageNum + 1 }));
    setPageNum(pageNum + 1);
  }

  function clearResultsHandler() {
    dispatch(clearResults());
    searchResultTransition(true);
  }

  return (
    <div className={styles.container} id="result">
      <div className={styles.description}>
        <strong>{currentSearch?.title}</strong> jobs around the area of{" "}
        <strong>
          {currentSearch?.city}, {currentSearch?.zipCode}
        </strong>
      </div>
      <div className={styles.button_group}>
        {hasMore ? (
          <Button variant="success" onClick={pageChangeHandler} size="sm">
            Load More Jobs
          </Button>
        ) : (
          <div>No more result</div>
        )}

        <Button variant="warning" onClick={clearResultsHandler} size="sm">
          Clear Results
        </Button>
      </div>
    </div>
  );
}

export default memo(SearchResult);
