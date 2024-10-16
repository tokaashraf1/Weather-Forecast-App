
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get5DaysForecast, getCityData } from '../../store/slices/WeatherSlice';
import "./WeatherBox.css"

import ExtendedForecast from "../ExtendedForecast/ExtendedForecast";

import CurrentWeatherDetails from "../CurrentWeatherDetails/CurrentWeatherDetails";
import SearchForm from "../SearchForm/SearchForm";
function WeatherBox() {
  const {
    citySearchLoading,
    citySearchData,
    forecastLoading,
    forecastData,
    forecastError,
  } = useSelector((state) => state.weather);
  const [loadings, setLoadings] = useState(true);
  const [city, setCity] = useState("Karachi");
  const [unit, setUnit] = useState("metric");
  const allLoadings = [citySearchLoading, forecastLoading];
  useEffect(() => {
    const isAnyChildLoading = allLoadings.some((state) => state);
    setLoadings(isAnyChildLoading);
  }, [allLoadings]);

  const toggleUnit = () => {
    setLoadings(true);
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  const dispatch = useDispatch();

  const fetchData = () => {
    dispatch(getCityData({ city, unit })).then((res) => {
      if (!res.payload.error) {
        dispatch(
          get5DaysForecast({
            lat: res.payload.data.coord.lat,
            lon: res.payload.data.coord.lon,
            unit,
          })
        );
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, [unit]);

  const handleCitySearch = (e) => {
    e.preventDefault();
    setLoadings(true);
    fetchData();
  };

  const filterForecastByFirstObjTime = (forecastData) => {
    if (!forecastData) return [];
    const firstObjTime = forecastData[0].dt_txt.split(" ")[1];
    return forecastData.filter((data) => data.dt_txt.endsWith(firstObjTime));
  };

  const filteredForecast = filterForecastByFirstObjTime(forecastData?.list);
  return (
    <div className="background">
    <div className="box">
      <SearchForm
        city={city}
        setCity={setCity}
        loadings={loadings}
        handleCitySearch={handleCitySearch}
      />
      <CurrentWeatherDetails
        loadings={loadings}
        citySearchData={citySearchData}
        unit={unit}
        toggleUnit={toggleUnit}
        forecastError={forecastError}
      />
      <ExtendedForecast filteredForecast={filteredForecast} />
    </div>
  </div>
  )
}

export default WeatherBox