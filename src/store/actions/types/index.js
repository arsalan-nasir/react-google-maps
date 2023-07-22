import mapValues from "lodash/mapValues";

const ACTIONS = {
  PLACES_REQUEST: null,
  PLACES_SUCCESS: null,
  PLACES_ERROR: null,
  SET_MARKER_LOCATION: null,
};

export default mapValues(ACTIONS, (v, k) => k);
