import { produce } from "immer";
import ACTIONS from "../actions/types";

const placesReducer = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.PLACES_REQUEST:
      draft.loading = true;
      return;
    case ACTIONS.PLACES_SUCCESS:
      draft.loading = false;
      draft.placesList = action.payload;
      return;
    case ACTIONS.SET_MARKER_LOCATION:
      draft.loading = false;
      draft.markerLocation = action.payload;
      return;
    case ACTIONS.SAVE_SEARCH_HISTORY:
      draft.searchHistory = action.payload;
      return;
    case ACTIONS.SHOW_SEARCH_HISTORY:
      draft.placesList = action.payload;
      return;
    default:
      return draft;
  }
});

export default placesReducer;
