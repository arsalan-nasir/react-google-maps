/* eslint-disable no-undef */
import ACTIONS from "./types";

const service = await google.maps.importLibrary("places");
const autoComplete = new service.AutocompleteService();

const placesService = new google.maps.places.PlacesService(
  new window.google.maps.Map(document.createElement("map"))
);

function placesRequest() {
  return { type: ACTIONS.PLACES_REQUEST };
}

export function placesSuccess(payload) {
  return { type: ACTIONS.PLACES_SUCCESS, payload };
}

function setMarkerLocation(payload) {
  return { type: ACTIONS.SET_MARKER_LOCATION, payload };
}

function setSearchHistory(payload) {
  return { type: ACTIONS.SAVE_SEARCH_HISTORY, payload };
}

function showSearchHistory(payload) {
  return { type: ACTIONS.SHOW_SEARCH_HISTORY, payload };
}

export function onPlaceSearch(value) {
  return async (dispatch) => {
    dispatch(placesRequest());
    try {
      autoComplete.getPlacePredictions({ input: value }, (arr, status) => {
        if (Array.isArray(arr)) {
          const tempArr = arr.map((item) => {
            return { ...item, value: item.place_id, label: item.description };
          });

          dispatch(placesSuccess(tempArr));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getSelectedPlaceData(placeId) {
  return async (dispatch) => {
    dispatch(placesRequest());
    try {
      placesService.getDetails({ placeId }, (res) => {
        const location = {
          lat: res.geometry.location.lat(),
          lng: res.geometry.location.lng(),
        };

        dispatch(setMarkerLocation(location));
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function saveSearchHistory(data) {
  return async (dispatch, getState) => {
    try {
      const {
        places: { searchHistory },
      } = getState();
      dispatch(setSearchHistory([...searchHistory, data]));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getSearchHistory() {
  return async (dispatch, getState) => {
    const {
      places: { searchHistory },
    } = getState();
    dispatch(showSearchHistory(searchHistory));
  };
}
