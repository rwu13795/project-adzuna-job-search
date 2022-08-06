import { createSelector, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../index";
import { MapState } from "./interfaces";
import { LoadingStatus } from "../../utils";
import {
  adzunaSearch,
  adzunaSearch_fulfilled,
  adzunaSearch_pending,
  adzunaSearch_rejected,
} from "./extra-reducers/adzunaSearch";
import {
  clearResults_reducer,
  setCurrentSearch_reducer,
  setLoadingStatus_reducer,
  setOpenModal_reducer,
  setTargetJobId_reducer,
} from "./reducers";

const initialState: MapState = {
  loadingStatus: LoadingStatus.idle,
  currentSearch: null,
  resultsList: {
    items: {},
    ids: [],
    hasMore: true,
    lat_lng_set: {},
  },
  targetJobId: null,
  openModal: false,
};

const mapSlice = createSlice({
  name: "map",
  initialState: initialState,
  reducers: {
    setLoadingStatus: setLoadingStatus_reducer,
    setCurrentSearch: setCurrentSearch_reducer,
    setTargetJobId: setTargetJobId_reducer,
    setOpenModal: setOpenModal_reducer,
    clearResults: clearResults_reducer,
  },

  extraReducers: (builder) => {
    builder
      /***************  adzuna search  ***************/
      .addCase(adzunaSearch.fulfilled, adzunaSearch_fulfilled)
      .addCase(adzunaSearch.pending, adzunaSearch_pending)
      .addCase(adzunaSearch.rejected, adzunaSearch_rejected);
  },
});

export const {
  setLoadingStatus,
  setCurrentSearch,
  setTargetJobId,
  setOpenModal,
  clearResults,
} = mapSlice.actions;

export default mapSlice.reducer;

const selectMapState = (state: RootState) => state.map;

export const selectLoadingStatus = createSelector(
  [selectMapState],
  (mapState) => mapState.loadingStatus
);
export const selectCurrentSearch = createSelector(
  [selectMapState],
  (mapState) => mapState.currentSearch
);
export const selectResultsList = createSelector(
  [selectMapState],
  (mapState) => mapState.resultsList
);
export const selectTargetResult = createSelector(
  [selectResultsList, selectMapState],
  (results, mapState) => {
    if (mapState.targetJobId) {
      return results.items[mapState.targetJobId];
    }
  }
);
export const selectHasMore = createSelector(
  [selectResultsList],
  (results) => results.hasMore
);
export const selectOpenModal = createSelector(
  [selectMapState],
  (mapState) => mapState.openModal
);
