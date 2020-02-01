import React, { Component } from "react";
import "./UpFunction.css";

class UpFunction extends React.Component {
  render = () => {
    const { operation = {} } = this.props;
    return (
      <div className="up-function" key={operation.id}>
        {operation.id}
      </div>
    );
  };

  static composeValue = operation => {
    return {
      mode: "UP",
      value: "UP",
      key: "UP"
    };
  };
}

export default UpFunction;
