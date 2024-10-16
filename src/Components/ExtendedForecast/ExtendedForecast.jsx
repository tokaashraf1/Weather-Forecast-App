
import React from "react";
const ExtendedForecast = ({ filteredForecast }) => {
  if (filteredForecast.length === 0) {
    return <div className="error-msg">No Data Found</div>;
  }
  return (
    <div>
      <h4 className="extended-forecast-heading">Extended Forecast</h4>
      <div className="extended-forecasts-container">
        {filteredForecast.map((data, index) => {
          const date = new Date(data.dt_txt);
          const day = date.toLocaleDateString("en-US", {
            weekday: "short",
          });
          return (
            <div className="forecast-box" key={index}>
              <h5>{day}</h5>
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                alt="icon"
              />
              <h5>{data.weather[0].description}</h5>
              <h5 className="min-max-temp">
                {data.main.temp_max}&deg; / {data.main.temp_min}&deg;
              </h5>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExtendedForecast;


