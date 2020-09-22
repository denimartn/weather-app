import React from "react";
import "./App.css";
import "./tailwind.output.css";
import axios from "axios";
function App() {
  const [inputValue, setInputValue] = React.useState("");
  const [locationWeather, setLocationWeather] = React.useState([]);
  const [state, setState] = React.useState("empty");

  const onSubmit = async (e) => {
    e.preventDefault();
    setState("loading");
    try {
      const api =
        "https://thingproxy.freeboard.io/fetch/https://www.metaweather.com/api";
      const query = inputValue;
      const res = await axios.get(`${api}/location/search/?query=${query}`);
      if (!res.data[0]) {
        setState("empty");
        return;
      }
      let woeid = res.data[0].woeid;

      const location = await axios.get(`${api}/location/${woeid}`);

      let newArr = [];
      for (let weather of location.data.consolidated_weather) {
        newArr.push(weather);
      }
      setState("ready");
      setLocationWeather(newArr);
      setInputValue("");
    } catch (err) {
      console.log(err);
      setState("error");
    }
  };

  return (
    <div className="main-container w-full ">
      <div className="title  font-bold text-4xl mb-2 mt-8 text-center">
        Weather forecast
      </div>
      <p className="subtitle text-center mb-2 text-sm">
        Made by{" "}
        <a className="subtitle text-sm" href="https://github.com/denimartn">
          Denise
        </a>
      </p>
      <form onSubmit={onSubmit}>
        <div className="input-wrapper max-w-md mx-auto px-2 py-2 flex">
          <input
            className="shadow appearance-none border rounded-lg py-2 px-3 text-grey-darker mr-1 bg-white focus:outline-none  w-full"
            type="text"
            placeholder="Enter a city"
            onChange={(event) => setInputValue(event.target.value)}
          ></input>
          <button
            type="submit"
            className="bg-dodgerblue-400  appearance-none border rounded-lg py-2 px-3 text-white mr-1 font-bold focus:outline-none "
          >
            Search
          </button>
        </div>

        <div className="container mx-auto px-2 flex justify-center mt-5">
          {state === "loading" ? (
            <div className="flex justify-center mt-5">
              <div className="loader ease-linear 0 rounded-full border-8 border-t-8  h-20 w-20"></div>
            </div>
          ) : null}
          {state === "error" ? (
            <button
              className="error bg-red-100 border border-red-400 text-red p-2 rounded mx-auto "
              onClick={() => {
                setState("empty");
              }}
            >
              Hey, something seriously went wrong!
            </button>
          ) : null}
          {state === "ready" ? (
            <div className="cards px-4 py-4 flex justify-center">
              {locationWeather.map((weather, index) => (
                <div
                  key={index}
                  className="card shadow-lg px-4 py-4 mr-4 bg-white"
                >
                  <h2 className="date text-center mb-4 text-sm">
                    {dateConverter(weather.applicable_date)}
                  </h2>
                  <div className="flex">
                    <img
                      className="icon mb-2 w-10 h-10 mx-auto mt-2 mb-4"
                      alt="weather icon"
                      src={`https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`}
                    />
                  </div>
                  <div className="flex justify-between mb-4">
                    <p className="temp mr-6 font-medium">
                      {floor(weather.min_temp)}°
                    </p>
                    <p className="temp font-medium">
                      {floor(weather.max_temp)}°
                    </p>
                  </div>
                  <p className="description text-center">
                    {weather.weather_state_name}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
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
    //format date
    let options = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };
    newStr = new Intl.DateTimeFormat("en-US", options).format(dateToCheck);
  }
  return newStr;
}

export default App;
