import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./calculator.css";


const socket = io("http://localhost:8000");

export function Calculator() {
  const [calculation, setCalculation] = useState("");
  const [calcList, setCalcList] = useState([]);
  const [expression, setExpression] = useState("");  

  useEffect(() => {
    console.log("emitting event");
    socket.on("calculation", data => {
      if (calcList.length === 10) calcList.shift();
      setCalcList([...calcList, data.calculation]);
    });
    
  }, [calcList]); 

  const emitExpression = exp => { 
    
    socket.emit("subscribeToCalculation", {
      calculation: exp
    });
    setCalculation(exp);
    if (calcList.length === 10) calcList.shift();
    setCalcList([...calcList, exp]);
  };

  const handleCalcClicked = event => {
    switch (event) {
      case "c":
        setExpression(expression.slice(0, -1));
        break;

      case "d":
        setExpression("");
        break;

      case "=":
        calculate();
        break;

      default:
        setExpression(expression + "" + event);
        break;
    }
  };

  const calculate = () => {
    

    try {
      const result = eval(expression) | "";
      setExpression(result.toString());
      emitExpression(expression + " = " + result);
    } catch (e) {
      setExpression("error");
      emitExpression(expression + " = error");
    }
  };

  return (
    <div>
      <div className="flex-container">
        <div className="flex-item">
          <table className="table-style">
            <tbody>
              <tr>
                <td colSpan={4} className="calc-header">
                  {expression}
                </td>
              </tr>
              <tr>
                <td className="button" onClick={() => handleCalcClicked(7)}>
                  7
                </td>
                <td className="button" onClick={() => handleCalcClicked(8)}>
                  8
                </td>
                <td className="button" onClick={() => handleCalcClicked(9)}>
                  9
                </td>
                <td
                  className="button button-operator"
                  onClick={() => handleCalcClicked("/")}
                >
                  /
                </td>
              </tr>
              <tr>
                <td className="button" onClick={() => handleCalcClicked(4)}>
                  4
                </td>
                <td className="button" onClick={() => handleCalcClicked(5)}>
                  5
                </td>
                <td className="button" onClick={() => handleCalcClicked(6)}>
                  6
                </td>
                <td
                  className="button button-operator"
                  onClick={() => handleCalcClicked("*")}
                >
                  *
                </td>
              </tr>
              <tr>
                <td className="button" onClick={() => handleCalcClicked(1)}>
                  1
                </td>
                <td className="button" onClick={() => handleCalcClicked(2)}>
                  2
                </td>
                <td className="button" onClick={() => handleCalcClicked(3)}>
                  3
                </td>
                <td
                  className="button button-operator"
                  onClick={() => handleCalcClicked("+")}
                >
                  +
                </td>
              </tr>
              <tr>
                <td
                  className="button button-cancel"
                  onClick={() => handleCalcClicked("c")}
                >
                  C
                </td>
                <td className="button" onClick={() => handleCalcClicked(0)}>
                  0
                </td>
                <td className="button" onClick={() => handleCalcClicked(".")}>
                  .
                </td>
                <td
                  className="button button-operator"
                  onClick={() => handleCalcClicked("-")}
                >
                  -
                </td>
              </tr>
              <tr>
                <td
                  colSpan={3}
                  style={{ width: "190px" }}
                  className="button button-cancel"
                  onClick={() => handleCalcClicked("d")}
                >
                  Del
                </td>
                <td
                  className="button button-operator"
                  onClick={() => handleCalcClicked("=")}
                >
                  =
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex-item">
          <div className="calc-list">
            <ul>
              {calcList.map((calc, index) => (
                <li key={index}>{calc}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
