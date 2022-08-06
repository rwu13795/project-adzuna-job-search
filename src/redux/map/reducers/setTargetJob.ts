import { PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

import { MapState } from "../interfaces";

export function setTargetJobId_reducer(
  state: WritableDraft<MapState>,
  action: PayloadAction<string>
) {
  state.targetJobId = action.payload;
}
