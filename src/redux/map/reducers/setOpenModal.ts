import { PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

import { MapState } from "../interfaces";

export function setOpenModal_reducer(
  state: WritableDraft<MapState>,
  action: PayloadAction<boolean>
) {
  state.openModal = action.payload;
}
