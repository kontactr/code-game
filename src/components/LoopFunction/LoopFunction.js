import React, { Component } from "react";
import "./LoopFunction.css";
import { toJS } from "mobx";

class LoopFunction extends React.Component {
  render = () => {
    const { operation, children } = this.props;
    return (
      <div
        className="loop-function"
        onDrop={e => {
          e.preventDefault();

          if (e.target.dataset.appIds) {
            e.target.dataset.appIds += operation.id + ",";
          } else {
            e.target.dataset.appIds = operation.id + ",";
          }
          console.log("OP DROP CALLED", operation.id, operation);
        }}
        onDragOver={e => {
          e.preventDefault();
        }}
      >
        <>
        {operation.id}
        {children}
        </>
      </div>
    );
  };

  static composeValue = operation => {
    return {
      mode: "LOOP",
      value: {},
      key: "LOOP"
    };
  };
}

export default LoopFunction;
