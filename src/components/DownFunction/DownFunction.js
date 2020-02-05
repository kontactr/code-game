import React, { Component } from "react";
import "./DownFunction.css";

class DownFunction extends React.Component {
  scrollIntoView = () => {
    this.downFunctionView.scrollIntoView({
      behavior: "smooth"
    });
  };

  getComponent = () => {
    return DownFunction;
  };

  render = () => {
    const { operation = {} } = this.props;
    return (
      <div
        className="down-function"
        key={operation.id}
        ref={downFunctionView => {
          this.downFunctionView = downFunctionView;
        }}
      >
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
