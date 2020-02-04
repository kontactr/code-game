import React, { Component } from "react";
import "./DownFunction.css";

class DownFunction extends React.Component {
  render = () => {
    const { operation = {} } = this.props;
    return (
      <div className="down-function" key={operation.id}>
        {operation.mode}
      </div>
    );
  };

  static composeValue = operation => {
    return {
      mode: "DOWN",
      value: "DOWN",
      key: "DOWN",
      scalar: true
    };
  };

  generateFunctionString = () => {
    return `moveBackward();\n`;
  };
}

export default DownFunction;
