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
    return this.state.limit || 1
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
        {`${operation.mode} - ${operation.id}`}
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

 deComposeScalarValues = (containerTree) => {
    let flatMapArray = []
    if(containerTree.scalar) { return containerTree }
    else if(containerTree.mode === "LOOP"){
      let loopLimiter = containerTree.getMovementValue && containerTree.getMovementValue()
      for(let indexCounter = 1 ; indexCounter <= loopLimiter ; indexCounter++){
          Object.keys(containerTree.value || {}).forEach((functionSyntax) => {

        let fun = containerTree.value[functionSyntax]
        
        if(fun.scalar){
          flatMapArray.push(fun)
        }else if(fun.mode === "LOOP"){
         flatMapArray =  flatMapArray.concat(this.deComposeScalarValues(fun))
        }else{
          if(fun.deComposeScalarValues)
         flatMapArray =  flatMapArray.concat(fun.deComposeScalarValues(fun))
        }
      } )
      }
      
      
      return flatMapArray
    }else{
      return containerTree
    }
    
 }
}

export default LoopFunction;
