import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

import "./App.css";
import AutoCompleteField from "./components/AutoComplete";
import { useDispatch, useSelector } from "react-redux";
import {
  onPlaceSearch,
  getSelectedPlaceData,
  getSearchHistory,
  saveSearchHistory,
  placesSuccess,
} from "./store/actions/places.actions";
import { Spin } from "antd";
import { useState, useCallback } from "react";

const App = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_API_KEY,
  });

  const { placesList, markerLocation } = useSelector((state) => ({
    placesList: state.places.placesList,
    markerLocation: state.places.markerLocation,
  }));

  const handlePlaceSearch = useCallback(
    async (e) => {
      dispatch(onPlaceSearch(e));
    },
    [dispatch]
  );

  const onSearchChange = useCallback((e) => {
    if (!e) {
      dispatch(placesSuccess([]));
    }
    setValue(e);
  }, []);

  const onSelect = useCallback(
    (data) => {
      const { description, place_id } = placesList.find(
        (item) => item.place_id === data
      );
      setValue(description);
      dispatch(
        saveSearchHistory({
          value: place_id,
          label: description,
          description,
          place_id,
        })
      );
      dispatch(getSelectedPlaceData(data));
    },
    [dispatch, placesList]
  );

  return (
    <div className="App">
      {!isLoaded ? (
        <Spin size="large" />
      ) : (
        <>
          <GoogleMap
            id="maps"
            mapContainerClassName="map-container"
            center={markerLocation}
            zoom={15}
          >
            <AutoCompleteField
              value={value}
              options={placesList}
              onSelect={(val) => onSelect(val)}
              onSearch={(text) => handlePlaceSearch(text)}
              onChange={onSearchChange}
              onFocus={() => dispatch(getSearchHistory())}
            />
            <Marker position={markerLocation} />
          </GoogleMap>
        </>
      )}
    </div>
  );
};

export default App;
