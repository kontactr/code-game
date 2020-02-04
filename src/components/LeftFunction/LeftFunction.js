import React from "react";
import "./LeftFunction.css";

class LeftFunction extends React.Component {
  scrollIntoView = () => {
    this.leftFunctionRef.scrollIntoView({
      behavior: "smooth"
    });
  };

  render = () => {
    const { operation = {} } = this.props;
    return (
      <div
        className="left-function"
        key={operation.id}
        ref={leftFunctionRef => {
          this.leftFunctionRef = leftFunctionRef;
        }}
      >
        {operation.mode}
      </div>
    );
  };

  static composeValue = operation => {
    return { mode: "LEFT", value: "LEFT", key: "LEFT", scalar: true };
  };

  generateFunctionString = () => {
    return `moveLeft();\n`;
  };
}

export default LeftFunction;
