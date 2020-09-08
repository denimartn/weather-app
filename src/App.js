import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./tailwind.output.css";

function App() {
  return (
    <div className="max-w-md mx-auto flex p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
        <h1 className="text-2xl text-blue-700 leading-tight">
          Weather app
        </h1>
    </div>
  );
}

export default App;
