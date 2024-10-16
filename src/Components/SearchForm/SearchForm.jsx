import React from "react";
import Icon from "react-icons-kit";
import { search } from "react-icons-kit/feather/search";

function SearchForm({ city, setCity, loadings, handleCitySearch }) {
  return (
    <form autoComplete="off" onSubmit={handleCitySearch}>
      <label>
        <Icon icon={search} size={20} />
      </label>
      <input
        type="text"
        className="city-input"
        placeholder="Enter City"
        required
        value={city}
        onChange={(e) => setCity(e.target.value)}
        readOnly={loadings}
      />
      <button type="submit">GO</button>
    </form>
  );
}

export default SearchForm;
