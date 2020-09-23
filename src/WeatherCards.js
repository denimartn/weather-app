import React from "react";
import { WeatherCard } from "./WeatherCard";
import { dateConverter, floor } from "./utils";
import "./WeatherCards.css"
export const WeatherCards = (props) => {
  return (
    <div className="cards px-4 py-4 flex justify-center">
      {props.locationWeather.map((weather, index) => (
        <WeatherCard
          key={index}
          date={dateConverter(weather.applicable_date)}
          src={`https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`}
          minTemp={floor(weather.min_temp)}
          maxTemp={floor(weather.max_temp)}
          description={weather.weather_state_name}
        />
      ))}
    </div>
  );
};
