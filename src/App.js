import React from "react";
import "./App.css";
import "./tailwind.output.css";
import axios from "axios";
function App() {
  const [inputValue, setInputValue] = React.useState("");
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [locationWeather, setLocationWeather] = React.useState([]);
  const [title, setTitle] = React.useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const api =
      "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api";
    const query = inputValue;
    const res = await axios.get(`${api}/location/search/?query=${query}`);
    let woeid = res.data[0].woeid;

    console.log("ress", res);
    const location = await axios.get(`${api}/location/${woeid}`);
    console.log(location);
    setTitle(location.data.title + ", " + location.data.parent.title);
    let newArr = [];
    for (let weather of location.data.consolidated_weather) {
      newArr.push(weather);
    }
    setIsLoaded(true);
    setLocationWeather(newArr);
  };

  return (
    <div className="main-container w-full">
      <h1 className="text-center m-4 font-bold text-4xl max-w-md mx-auto">
        #weather app
      </h1>
      <form onSubmit={onSubmit}>
        <div className="input-wrapper max-w-md mx-auto px-2 py-10 flex">
          <input
            className="mr-1 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg  px-4 py-2  w-full"
            type="text"
            placeholder="Type a place..."
            onChange={(event) => setInputValue(event.target.value)}
          ></input>
          <button
            type="submit"
            className="focus:outline-none bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-2 border rounded-lg"
          >
            Search
          </button>
        </div>
        <h1 className="title text-center font-bold text-3xl">{title}</h1>

        <div className="container mx-auto px-2 flex justify-center">
          {!isLoaded ? (
            <div>Loading....</div>
          ) : (
            <div className="cards  w-32 px-4 py-4 flex justify-center">
              {locationWeather.map((weather, index) => (
                <div
                  key={index}
                  className="card shadow-lg rounded  px-4 py-4 mr-4"
                >
                  <h2 className="city text-center mb-4">
                    {dateConverter(weather.applicable_date)}
                  </h2>
                  <img
                    className="icon mb-2 w-10 h-10 mx-auto mt-2 mb-4"
                    src={`https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`}
                  />
                  <div className="flex justify-between mb-4">
                    <p className="temp mr-6">{floor(weather.min_temp)}°C</p>
                    <p className="temp">{floor(weather.max_temp)}°C</p>
                  </div>
                  <p className="description text-center">
                    {weather.weather_state_name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

// Utilities
function floor(n) {
  return Math.floor(n);
}

function dateConverter(str) {
  let newStr = "";
  const dateToCheck = new Date(str);
  const today = new Date();
  if (dateToCheck.toDateString() === today.toDateString()) {
    newStr = "Today";
  } else {
    newStr = dateToCheck.toDateString();
  }
  return newStr;
}

export default App;
