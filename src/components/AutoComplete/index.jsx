import React from "react";
import debounce from "lodash/debounce";
import "./AutoComplete.css";
import { AutoComplete } from "antd";

const AutoCompleteField = ({
  options,
  onSelect,
  onSearch,
  value,
  onChange,
}) => {
  const debouncedSearch = debounce(onSearch, 1000);

  return (
    <div className="autocomplete-container">
      <AutoComplete
        value={value}
        options={options}
        style={{
          width: "40%",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
        onSelect={onSelect}
        onSearch={(text) => debouncedSearch(text)}
        onChange={onChange}
        placeholder="Search for Places here"
      />
    </div>
  );
};
export default AutoCompleteField;
