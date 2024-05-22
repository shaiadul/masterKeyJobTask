"use client";
import React, { useState } from "react";

const AlphabetTiles = () => {
  const [outputString, setOutputString] = useState("");

  const handleTileClick = (letter) => {
    let newOutputString = outputString + letter;

    const regex = /(.)\1{2,}/g;
    newOutputString = newOutputString.replace(regex, (match) =>
      "_".repeat(Math.ceil(match.length / 3))
    );

    setOutputString(newOutputString);
  };

  const renderTiles = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    return alphabet.map((letter) => (
      <div
        key={letter}
        className="border border-gray-300 px-3 text-sm cursor-pointer hover:bg-gray-100 duration-700 rounded-sm"
        onClick={() => handleTileClick(letter)}
      >
        {letter}
      </div>
    ));
  };

  return (
    <div className="container">
      <div className="my-10">
        <div className="grid grid-cols-6 md:grid-cols-10 justify-center items-center gap-5 cursor-pointer my-5">
          {renderTiles()}
        </div>
        <div id="outputString" className="font-semibold">
          <span className="text-green-400">outputString:</span>{" "}
          {
            <span className="text-stone-700 ml-3">
              {outputString.length > 0 ? outputString : "Empty String"}
            </span>
          }
        </div>
      </div>
    </div>
  );
};

export default function OutputStringSection() {
  return (
    <div className="">
      <AlphabetTiles />
    </div>
  );
}
