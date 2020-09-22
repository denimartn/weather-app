import React from "react";
import "./App.css";
import "./tailwind.output.css";
import axios from "axios";
function App() {
  const [inputValue, setInputValue] = React.useState("");
  const [locationWeather, setLocationWeather] = React.useState([]);
  const [title, setTitle] = React.useState("");
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

      setTitle(location.data.title + ", " + location.data.parent.title);
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
      <div className="title  font-bold text-4xl mb-2 mt-8 text-center">Weather forecast</div>
      <p className="subtitle text-center mb-2">Made by <a className="subtitle" href="https://github.com/denimartn">Denise</a></p>
      <form onSubmit={onSubmit}>
        <div className="input-wrapper max-w-md mx-auto px-2 py-2 flex">
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-grey-darker mr-1 bg-white focus:outline-none  w-full"
            type="text"
            placeholder="Enter a city"
            onChange={(event) => setInputValue(event.target.value)}
          ></input>
          <button
            type="submit"
            className="focus:outline-none bg-dodgerblue-400 hover:bg-blue-700 text-white font-bold px-2 py-2 border rounded-lg"
          >
            Search
          </button>
        </div>

        {state === "ready" ? (
          <h1 className="title text-center font-bold text-3xl">{title}</h1>
        ) : null}

        <div className="container mx-auto px-2 flex justify-center">
          {state === "loading" ? (
               <div className="flex justify-center mt-5">
               <div className="loader ease-linear 0 rounded-full border-8 border-t-8  h-40 w-40"></div>
               </div>
          ) : null}
          {state === "error" ? (
            <div
              className="bg-red-100 border border-red-400 text-red pl-4 pr- py-3  px-3 rounded flex"
              role="alert"
            >
              Something seriously went wrong.
              <span>
                <svg
                  className="h-6 w-6 red"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  onClick={() => {
                    setState("empty");
                  }}
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z mb-2" />
                </svg>
              </span>
            </div>
          ) : null}
          {state === "ready" ? (
            <div className="cards  w-32 px-4 py-4 flex justify-center">
              {locationWeather.map((weather, index) => (
                <div
                  key={index}
                  className="card shadow-lg rounded  px-4 py-4 mr-4 bg-lightyGrey"
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
