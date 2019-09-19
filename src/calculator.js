import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

export function Calculator() {
  const [calculation, setcalculation] = useState("");
  const [calcList, setcalcList] = useState([]);

  useEffect(() => {
    console.log("emitting event");
    socket.on("calculation", data =>
      setcalcList([...calcList, data.calculation])
    );
    //socket.emit('subscribeToCalculation', 3000);

    //document.title = `${timestamp} new messages have been emitted`;
  }, [calcList]); //only re-run the effect if new message comes in

  const handleNewCalculation = () => {
    console.log("emitting new calc");
    //setcalculation("1+1=2");
    socket.emit("subscribeToCalculation", {
      calculation: "1+1=2"
    });
    setcalculation("1+1=2");
    setcalcList([...calcList, "1+1=2"]);
  };
  return (
    <div className="App">
      <button onClick={() => handleNewCalculation()}>Add</button>
      <ul>
        {calcList.map((calc, index) => (
          <li key={index}>{calc}</li>
        ))}
      </ul>
    </div>
  );
}
