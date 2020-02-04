import React, { Component } from "react";
import "./UpFunction.css";

class UpFunction extends React.Component {
  render = () => {
    const { operation = {} } = this.props;
    return (
      <div className="up-function" key={operation.id}>
        {operation.mode}
      </div>
    );
  };

  static composeValue = operation => {
    return { mode: "UP", value: "UP", key: "UP", scalar: true };
  };

  generateFunctionString = () => {
    return `moveForward();\n`;
  };
}

export default UpFunction;
