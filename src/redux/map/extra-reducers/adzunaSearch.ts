import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import { RootState } from "../..";
import { AxiosClient, LoadingStatus } from "../../../utils";
import { MapState, SearchResult } from "../interfaces";

const app_id = process.env.REACT_APP_ADZUNA_APP_ID;
const app_key = process.env.REACT_APP_ADZUNA_APP_KEYS;
// search/1 -- "1" is the number of the page, each page contains 10 result. useful when using pagination/infinite scroll
const adzunaApiUrl = `https://api.adzuna.com/v1/api/jobs/us/search`;

interface Req_params {
  pageNum: number;
}

export const adzunaSearch = createAsyncThunk<
  SearchResult[],
  Req_params,
  { state: RootState }
>("map/adzunaSearch", async (req_params, thunkAPI) => {
  const client = AxiosClient.getClient();
  const currentSearch = thunkAPI.getState().map.currentSearch;
  if (!currentSearch) {
    return thunkAPI.rejectWithValue("No search input");
  }

  const { city, title, zipCode } = currentSearch;
  const { pageNum } = req_params;

  try {
    const response = await client.get<{ results: SearchResult[] }>(
      adzunaApiUrl +
        `/${pageNum}?app_id=${app_id}&app_key=${app_key}&what=${title}&what_and=${city}&where=${zipCode}&distance=${50}`
    );

    return response.data.results;
  } catch (err: any) {
    // catch the error sent from the server manually, and put in inside the action.payload
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export function adzunaSearch_fulfilled(
  state: WritableDraft<MapState>,
  action: PayloadAction<SearchResult[]>
) {
  const prevResultCount = state.resultsList.ids.length;

  if (action.payload.length !== 10) {
    state.resultsList.hasMore = false;
  }

  if (prevResultCount === 0) {
    for (let result of action.payload) {
      state.resultsList.items[result.id] = result;
      state.resultsList.ids.push(result.id);
      state.resultsList.lat_lng_set[result.latitude] = true;
      state.resultsList.lat_lng_set[result.longitude] = true;
    }
  }
  // have to filter the search results, the results alays consist of
  // same jobs with different ids !!
  else {
    for (let result of action.payload) {
      if (
        state.resultsList.lat_lng_set[result.latitude] &&
        state.resultsList.lat_lng_set[result.longitude]
      ) {
        console.log("duplicated job found!");
        continue;
      }
      state.resultsList.items[result.id] = result;
      state.resultsList.ids.push(result.id);
      state.resultsList.lat_lng_set[result.latitude] = true;
      state.resultsList.lat_lng_set[result.longitude] = true;
    }
  }

  state.loadingStatus = LoadingStatus.succeeded;
}

export function adzunaSearch_pending(state: WritableDraft<MapState>) {
  state.loadingStatus = LoadingStatus.loading;
}

export function adzunaSearch_rejected(
  state: WritableDraft<MapState>,
  action: PayloadAction<any>
) {
  console.log("Error: ", action.payload);
  state.loadingStatus = LoadingStatus.failed;
}
