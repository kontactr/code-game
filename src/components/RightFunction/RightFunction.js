import React from "react";
import "./RightFunction.css";

class RightFunction extends React.Component {
  scrollIntoView = () => {
    this.rightFunctionRef.scrollIntoView({
      behavior: "smooth"
    });
  };

  getComponent = () => {
    return RightFunction;
  };

  render = () => {
    const { operation = {} } = this.props;
    return (
      <div
        className="right-function"
        key={operation.id}
        ref={rightFunctionRef => {
          this.rightFunctionRef = rightFunctionRef;
        }}
      >
        {operation.mode}
      </div>
    );
  };

  static composeValue = operation => {
    return { mode: "RIGHT", value: "RIGHT", key: "RIGHT", scalar: true };
  };

  generateFunctionString = () => {
    return `moveRight();\n`;
  };

  generateRaw = operation => {
    return { id: operation.id, value: null };
  };
}

export default RightFunction;
