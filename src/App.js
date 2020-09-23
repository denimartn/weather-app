import React from "react";
import "./App.css";
import "./tailwind.output.css";
import axios from "axios";
import { Form } from "./Form";
import { WeatherCards } from "./WeatherCards";

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
      <Form onSubmit={onSubmit} setInputValue={setInputValue} />

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
          <WeatherCards locationWeather={locationWeather} />
        ) : null}
      </div>
    </div>
  );
}

// Utilities
export function floor(n) {
  return Math.floor(n);
}

export function dateConverter(str) {
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
