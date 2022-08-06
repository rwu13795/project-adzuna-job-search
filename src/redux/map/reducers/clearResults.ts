import { WritableDraft } from "immer/dist/internal";

import { MapState } from "../interfaces";

export function clearResults_reducer(state: WritableDraft<MapState>) {
  state.resultsList = { items: {}, ids: [], hasMore: true, lat_lng_set: {} };
}
