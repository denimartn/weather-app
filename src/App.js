import React from "react";
import "./App.css";
import "./tailwind.output.css";

function App() {
  return (
    <div className="main-container w-full">
      <div className="container max-w-md mx-auto px-6 py-10">
        <input
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg  px-4 py-2  w-full"
          type="text"
          placeholder="Type a place..."
        ></input>
      </div>
    </div>
  );
}

export default App;
