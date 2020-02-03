import React, { Component } from "react";
import "./RightFunction.css";

class RightFunction extends React.Component {
  render = () => {
    const { operation = {} } = this.props;
    return (
      <div className="right-function" key={operation.id}>
        {operation.mode}
      </div>
    );
  };

  static composeValue = operation => {
    return { mode: "RIGHT", value: "RIGHT", key: "RIGHT", scalar: true };
  };

  generateFunctionString = () => {
    return `moveRight()\n`;
  };
}

export default RightFunction;
