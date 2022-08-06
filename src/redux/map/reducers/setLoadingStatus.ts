import { PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

import { LoadingStatus } from "../../../utils";
import { MapState } from "../interfaces";

export function setLoadingStatus_reducer(
  state: WritableDraft<MapState>,
  action: PayloadAction<LoadingStatus>
) {
  state.loadingStatus = action.payload;
}
