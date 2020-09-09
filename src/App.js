import React from "react";
import "./App.css";
import "./tailwind.output.css";
import axios from "axios";

function App() {
  const [inputValue, setInputValue] = React.useState("");
  const [items, setItems] = React.useState([]);
  let itemsToRender = items;
  let woeid = "";

  const api =
    "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api";
  const onSubmit = async (e) => {
    e.preventDefault();
    addItem();
    const query = "milan";
    const res = await axios.get(`${api}/location/search/?query=${query}`);
    woeid = res.data[0].woeid;
    console.log("woeid", woeid);
    const resp2 = await axios.get(`${api}/location/${woeid}`);
  };
  const addItem = () => {
    setItems([
      {
        id: Math.random(),
        place: inputValue,
        img: "https://picsum.photos/70/70",
        degree: "23",
      },
    ]);
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
          {itemsToRender.map((item) => (
            <div className="card" key={item.id}>
              <h3 className="place mb-2">{item.place}</h3>
              <img className="image mb-2" src={item.img} />
              <div className="degree mb-2">{item.degree}</div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default App;
