import React, { Component } from "react";
import UpFunction from "../UpFunction/UpFunction";
import LoopFunction from "../LoopFunction/LoopFunction";
import { toJS } from "mobx";

const modeToComponent = {
  UP: {
    mode: "UP",
    Component: UpFunction,
    composeValue: UpFunction.composeValue
  },
  DOWN: {
    mode: "DOWN",
    Component: UpFunction,
    composeValue: UpFunction.composeValue
  },
  BOTTOM: {
    mode: "BOTTOM",
    Component: UpFunction,
    composeValue: UpFunction.composeValue
  },
  LOOP: {
    mode: "LOOP",
    Component: LoopFunction,
    composeValue: LoopFunction.composeValue
  },
  LEFT: {
    mode: "LEFT",
    Component: UpFunction,
    composeValue: UpFunction.composeValue
  },
  RIGHT: {
    mode: "RIGHT",
    Component: UpFunction,
    composeValue: UpFunction.composeValue
  }
};

export const generateComposeValue = (mode, pathIds, drawingData) => {
  console.log(mode , 39)
  return modeToComponent[mode].composeValue(mode , pathIds , drawingData);
}



export const generateJSXForFunctions = (drawingTree = {}) => {
  let objectKeys = Object.keys(drawingTree || {})
  if(!objectKeys.length) return <></>
  return objectKeys.map((operation) => {
    let value = drawingTree[operation].value;
    let mode = drawingTree[operation].mode ;
    let objectOrNot = typeof value === 'object' && value !== null

    console.log(toJS(drawingTree[operation]) , 54)
    

    const Component = modeToComponent[mode].Component
    if(objectOrNot){
       return <Component operation={drawingTree[operation]  }>
          {generateJSXForFunctions(value)}
       </Component>
      
    }else{
      return (
        <Component operation={drawingTree[operation]  }></Component>
      )
      
      
    }
  })
  

};
