import React from "react";

export const Form = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div className="input-wrapper max-w-md mx-auto px-2 py-2 flex">
        <input
          className="shadow appearance-none border rounded-lg py-2 px-3 text-grey-darker mr-1 bg-white focus:outline-none  w-full"
          type="text"
          placeholder="Enter a city"
          onChange={(event) => props.setInputValue(event.target.value)}
        ></input>
        <button
          type="submit"
          className="bg-dodgerblue-400  appearance-none border rounded-lg py-2 px-3 text-white mr-1 font-bold focus:outline-none "
        >
          Search
        </button>
      </div>
    </form>
  );
};
