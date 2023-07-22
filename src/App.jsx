import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

import "./App.css";
import AutoCompleteField from "./components/AutoComplete";
import { useDispatch, useSelector } from "react-redux";
import {
  onPlaceSearch,
  getSelectedPlaceData,
} from "./store/actions/places.actions";
import { Spin } from "antd";
import { useState } from "react";

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

  const handlePlaceSearch = async (e) => {
    dispatch(onPlaceSearch(e));
  };

  const onSearchChange = (e) => {
    setValue(e);
  };

  const onSelect = (data) => {
    const { description } = placesList.find((item) => item.place_id === data);
    setValue(description);
    dispatch(getSelectedPlaceData(data));
  };

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
            />
            <Marker position={markerLocation} />
          </GoogleMap>
        </>
      )}
    </div>
  );
};

export default App;
