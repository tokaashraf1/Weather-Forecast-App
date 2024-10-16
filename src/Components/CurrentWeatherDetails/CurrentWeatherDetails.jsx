// CurrentWeatherDetails.js
import React from "react";
import Icon from "react-icons-kit";
import { arrowUp, arrowDown, droplet, wind, activity } from "react-icons-kit/feather";
const CurrentWeatherDetails = ({
  loadings,
  citySearchData,
  forecastError,
  unit,
  toggleUnit,
}) => {
  if (loadings) {
    return (
      <div className="loader">
    <h2>loading.....</h2>
      </div>
    );
  }

  if (citySearchData?.error) {
    return <div className="error-msg">{citySearchData.error}</div>;
  }

  if (forecastError) {
    return <div className="error-msg">{forecastError}</div>;
  }

  if (!citySearchData?.data) {
    return <div className="error-msg">No Data Found</div>;
  }

  const { name, main, weather, wind: windData } = citySearchData.data;

  return (
    <div className="current-weather-details-box">
      <div className="details-box-header">
        <h4>Current Weather</h4>
        <div className="switch" onClick={toggleUnit}>
          <div className={`switch-toggle ${unit === "metric" ? "c" : "f"}`}></div>
          <span className="c">C</span>
          <span className="f">F</span>
        </div>
      </div>
      <div className="weather-details-container">
        <div className="details">
          <h4 className="city-name">{name}</h4>
          <div className="icon-and-temp">
            <img
              src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
              alt="icon"
            />
            <h1>{main.temp}&deg;</h1>
          </div>
          <h4 className="description">{weather[0].description}</h4>
        </div>
        <div className="metrices">
          <h4>
            Feels like {main.feels_like}&deg;{unit === "metric" ? "C" : "F"}
          </h4>
          <div className="key-value-box">
            <div className="key">
              <Icon icon={arrowUp} size={20} className="icon" />
              <span className="value">{main.temp_max}&deg;{unit === "metric" ? "C" : "F"}</span>
            </div>
            <div className="key">
              <Icon icon={arrowDown} size={20} className="icon" />
              <span className="value">{main.temp_min}&deg;{unit === "metric" ? "C" : "F"}</span>
            </div>
          </div>
          <div className="key-value-box">
            <div className="key">
              <Icon icon={droplet} size={20} className="icon" />
              <span>Humidity</span>
            </div>
            <div className="value">{main.humidity}%</div>
          </div>
          <div className="key-value-box">
            <div className="key">
              <Icon icon={wind} size={20} className="icon" />
              <span>Wind</span>
            </div>
            <div className="value">{windData.speed} kph</div>
          </div>
          <div className="key-value-box">
            <div className="key">
              <Icon icon={activity} size={20} className="icon" />
              <span>Pressure</span>
            </div>
            <div className="value">{main.pressure} hPa</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherDetails;
