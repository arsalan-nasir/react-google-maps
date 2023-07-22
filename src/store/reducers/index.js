import appInitialState from "../app-state/app-initial.state";

import placesReducer from "./places.reducer";

export default function reducer(state = appInitialState, action) {
  return {
    places: placesReducer(state.places, action),
  };
}
