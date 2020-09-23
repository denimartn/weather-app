import React from "react";
import "./WeatherCard.css"


export const WeatherCard = (props) => {
  return (
    <div key={props.index} className="card shadow-lg px-4 py-4 mr-4 bg-white">
      <h2 className="date text-center mb-4 text-sm">{props.date}</h2>
      <div className="flex">
        <img
          className="icon mb-2 w-10 h-10 mx-auto mt-2 mb-4"
          alt="weather icon"
          src={props.src}
        />
      </div>
      <div className="flex justify-between mb-4">
        <p className="temp mr-6 font-medium">{props.minTemp}°</p>
        <p className="temp font-medium">{props.maxTemp}°</p>
      </div>
      <p className="description text-center">{props.description}</p>
    </div>
  );
};
