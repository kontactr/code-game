import React from "react";
import "./UpFunction.css";

class UpFunction extends React.Component {
  scrollIntoView = () => {
    this.upFunctionRef.scrollIntoView({
      behavior: "smooth"
    });
  };

  getComponent = () => {
    return UpFunction;
  };

  render = () => {
    const { operation = {} } = this.props;
    return (
      <div
        className="up-function"
        key={operation.id}
        ref={upFunctionRef => {
          this.upFunctionRef = upFunctionRef;
        }}
      >
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

  generateRaw = operation => {
    return { id: operation.id, value: null };
  };
}

export default UpFunction;
