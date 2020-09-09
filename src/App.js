import React from "react";
import "./App.css";
import "./tailwind.output.css";
import axios from "axios";
function App() {
  const [inputValue, setInputValue] = React.useState("");
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [locationWeather, setLocationWeather] = React.useState();

  // Utilities

  let icons = {
    c: "",
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const api =
      "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api";
    const query = inputValue;
    const res = await axios.get(`${api}/location/search/?query=${query}`);
    let woeid = res.data[0].woeid;
    const location = await axios.get(`${api}/location/${woeid}`);

    setLocationWeather({
      city: location.data.title,
      iconAbbr: location.data.consolidated_weather[0].weather_state_abbr,
      minTemp: Math.floor(location.data.consolidated_weather[0].min_temp),
      maxTemp: Math.floor(location.data.consolidated_weather[0].max_temp),
      description: location.data.consolidated_weather[0].weather_state_name,
    });
    setIsLoaded(true);
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
        <div className="cards-container max-w-md mx-auto px-2">
          {!isLoaded ? (
            <div>Loading....</div>
          ) : (
            <div className="card border border-gray-300 w-32 px-4 py-4  ">
              <div className="place mb-2">
                <h1 className="city text-center">{locationWeather.city}</h1>
                <img
                  className="icon mb-2 w-10 h-10 mx-auto mt-2"
                  src={`https://www.metaweather.com/static/img/weather/${locationWeather.iconAbbr}.svg`}
                />
                <div className="flex justify-between">
                  <p className="temp">{locationWeather.minTemp}°C</p>
                  <p className="temp">{locationWeather.maxTemp}°C</p>
                </div>
                <p className="description text-center">
                  {locationWeather.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
