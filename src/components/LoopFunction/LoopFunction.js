import React, { Component } from "react";
import "./LoopFunction.css";
import { toJS } from "mobx";

class LoopFunction extends React.Component {

  state = {
    limit : 1
  }

  updateLimit = (type , value) => {
      this.setState((state) => ({
        [type]: (value % 10)  || 1
      }))
  }

  getMovementValues = () => {
    return this.state.value || 1
  }


  render = () => {
    const { operation, children } = this.props;
    const { limit = 1 } = this.state || {};
    return (
      <>
      
      <div
        className="loop-function"
        onDrop={e => {
          e.preventDefault();

          if (e.target.dataset.appIds) {
            e.target.dataset.appIds += operation.id + ",";
          } else {
            e.target.dataset.appIds = operation.id + ",";
          }
          
        }}
        onDragOver={e => {
          e.preventDefault();
        }}
      >
        <>
        {operation.mode}
        <input value={limit} type={"number"} min={1} max={9} onChange={(e) => {
        this.updateLimit("limit" , e.target.value);
      }}>
      
      </input>
        {children}
        </>
      </div>
      </>
    );
  };

  static composeValue = operation => {
    return {
      mode: "LOOP",
      value: {},
      key: "LOOP",
      
    };
  };

 deComposeScalarValues = () => {
   
 }
}

export default LoopFunction;
