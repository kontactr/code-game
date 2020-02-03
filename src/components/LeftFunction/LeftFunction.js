import React, { Component } from "react";
import "./LeftFunction.css";

class LeftFunction extends React.Component {
  render = () => {
    const { operation = {} } = this.props;
    return (
      <div className="left-function" key={operation.id}>
        {operation.mode}
      </div>
    );
  };

  static composeValue = operation => {
    return { mode: "LEFT", value: "LEFT", key: "LEFT", scalar: true };
  };

  generateFunctionString = () => {
    return `moveLeft()\n`;
  };
}

export default LeftFunction;
