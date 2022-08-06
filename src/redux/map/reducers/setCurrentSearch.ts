import { PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

import { CurrentSearch, MapState } from "../interfaces";

export function setCurrentSearch_reducer(
  state: WritableDraft<MapState>,
  action: PayloadAction<CurrentSearch | null>
) {
  state.currentSearch = action.payload;
}
