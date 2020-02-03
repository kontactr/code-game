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
        <input className={"loop-input"} value={limit} type={"number"} min={1} max={9} onChange={(e) => {
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
    if(containerTree.scalar) { return [containerTree] }
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
      return containerTree.deComposeScalarValues(containerTree)
    }
 }

 generateFunctionString = (containerTree) => {
  
  if(containerTree.scalar) { return [containerTree.generateFunctionString()] }
  else if(containerTree.mode === "LOOP" ){
    let loopLimiter = containerTree.getMovementValue && containerTree.getMovementValue()
    let loopStringArray = this.generateLoopStartString(containerTree.id , loopLimiter || 1)
    
    
          Object.keys(containerTree.value || {}).forEach((functionSyntax) => {
        let fun = containerTree.value[functionSyntax]
        if(fun.scalar){
          loopStringArray.push(fun.generateFunctionString())
        }else if(fun.mode === "LOOP"){
         loopStringArray =  loopStringArray.concat(this.generateFunctionString(fun))
        }else{
          if(fun.deComposeScalarValues)
         loopStringArray =  loopStringArray.concat(fun.generateFunctionString(fun))
        }
      } )
      

      

     loopStringArray.push(`}\n`)
     return loopStringArray
  }else{
    if(containerTree.generateFunctionString){
      return [containerTree.generateFunctionString(containerTree)]
    }else{
      return []
    }
  }


 }

 generateLoopStartString = (id, start) => {
   return [
     `for(let ${id}=${1} ; ${id}<=${start} ; ${id}++)\n`,
    `{\n`
   ]
 }

}

export default LoopFunction;
