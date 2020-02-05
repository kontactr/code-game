import React from "react";
import UpFunction from "../UpFunction/UpFunction";
import DownFunction from "../DownFunction/DownFunction";
import LeftFunction from "../LeftFunction/LeftFunction";
import RightFunction from "../RightFunction/RightFunction";
import LoopFunction from "../LoopFunction/LoopFunction";
import FunctionFirst from '../FunctionFirst/FunctionFirst'
import "./FunctionIndex.css"
import { Icon } from "antd";
import { toJS, observable } from "mobx";


const modeToComponent =  ({
  UP: {
    mode: "UP",
    Component: UpFunction,
    composeValue: UpFunction.composeValue
  },
  DOWN: {
    mode: "DOWN",
    Component: DownFunction,
    composeValue: DownFunction.composeValue
  },
  BOTTOM: {
    mode: "BOTTOM",
    Component: DownFunction,
    composeValue: DownFunction.composeValue
  },
  LOOP: {
    mode: "LOOP",
    Component: LoopFunction,
    composeValue: LoopFunction.composeValue
  },
  LEFT: {
    mode: "LEFT",
    Component: LeftFunction,
    composeValue: LeftFunction.composeValue
  },
  RIGHT: {
    mode: "RIGHT",
    Component: RightFunction,
    composeValue: RightFunction.composeValue
  },
  JUMP: {
    mode: "JUMP",
    Component: UpFunction,
    composeValue: UpFunction.composeValue
  },
  FUNCTION: {
    mode: "FUNCTION",
    Component: FunctionFirst,
    composeValue: FunctionFirst.composeValue
  }
});

export const addModeToComponent = (options = {}) => {
  const { mode = '' , Component = '' , composeValue = '' } = options
  if( !modeToComponent[mode]  &&  mode && Component && composeValue){
    modeToComponent[mode] = {
      mode,
      Component,
      composeValue
    }
  }
}

export const deleteModeToComponent = (mode) => {
  if(mode) delete modeToComponent[mode]
}


export const generateComposeValue = (mode, pathIds, drawingData) => {
  console.log(toJS(mode) , toJS(modeToComponent)  , 58)
  return modeToComponent[mode].composeValue(mode , pathIds , drawingData);
}


export const generateJSXForFunctions = (drawingTree = {}) => {
  let objectKeys = Object.keys(drawingTree || {})
  if(!objectKeys.length) {return (<></>)}
  console.log(toJS(drawingTree) , 655)
  return objectKeys.map((operation) => {
    
    let value = drawingTree[operation].value;
    let mode = drawingTree[operation].mode ;
  

    let objectOrNot = !drawingTree[operation].scalar  // typeof value === 'object' && value !== null
    const Component = modeToComponent[mode].Component


    if(objectOrNot){
       return (
       <div className="close-container"  > 
         <Icon   className={"close-circle close-circle-object"} type="close-circle" onClick={(e) => {
           e.stopPropagation()
           e.preventDefault()
           let t = drawingTree[operation]
           t.deleteEffect && t.deleteEffect()
           delete drawingTree[operation]       
           
         }} />
       <Component operation={drawingTree[operation]  }   ref={(refMarker) => {
        if(refMarker && refMarker.getMovementValues) {
          drawingTree[operation]["getMovementValue"] = refMarker.getMovementValues
          drawingTree[operation]["deComposeScalarValues"] = refMarker.deComposeScalarValues
          drawingTree[operation]["generateFunctionString"] = refMarker.generateFunctionString
          drawingTree[operation]["deleteEffect"] = refMarker.deleteEffect
          drawingTree[operation]["ref"] = refMarker
        }
       }} >
          {generateJSXForFunctions(value)  }
       </Component>
       </div>
       )
      
    }else{
      return (
        <div className="close-container">
          <Icon className={"close-circle"} type="close-circle" onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            let t = drawingTree[operation]
           t.deleteEffect && t.deleteEffect()
            delete drawingTree[operation]
          }} />
        <Component operation={drawingTree[operation] } ref={(refMarker) => {
        if(refMarker) {
          drawingTree[operation]["getMovementValue"] = refMarker.getMovementValues
          drawingTree[operation]["deComposeScalarValues"] = refMarker.deComposeScalarValues
          drawingTree[operation]["generateFunctionString"] = refMarker.generateFunctionString
          drawingTree[operation]["deleteEffect"] = refMarker.deleteEffect
          drawingTree[operation]["ref"] = refMarker

        }
       }}></Component>
       </div>
      ) 
    }
  })
};

export function generateScalarFunctionsToRun(drawingTree){
  let runArray = []
  Object.keys(drawingTree || {}).forEach((funId) => {
    let fun = drawingTree[funId]
    console.log(toJS(fun) , 147)
    if(fun.scalar){
      runArray.push(fun)
    }else{
      let convertedScalarValues = fun.deComposeScalarValues(fun)
      runArray = runArray.concat(convertedScalarValues)
    }
  })

  return runArray
}

export function generateCodeForFunctions(drawingTree){
 let stringArray = []
 Object.keys(drawingTree || {}).forEach(funId => {
  let fun = drawingTree[funId]
  
  if(fun.scalar){
    if(fun.generateFunctionString)
    stringArray.push(fun.generateFunctionString())
  }else{
    if(fun.generateFunctionString){
      stringArray = stringArray.concat(fun.generateFunctionString(fun))
    }
  }

 })
 
 return stringArray

}


export const spacePrettify = (lines) => {
  
  let spaceCounter = 0
  let newArrStrings = (lines || []).map((line) => {
      if(line.includes("{")){
          let string = generateSpaceString(spaceCounter)+line
          spaceCounter += 2
          return string
      }else if(line.includes("}")){
          spaceCounter -= 2
          return generateSpaceString(spaceCounter)+line
      }else{
          return  generateSpaceString(spaceCounter)+line
      }
  })
  return newArrStrings
}

const generateSpaceString = (number) => {
  let temp = ""
  for(let i=0 ; i<number ; i++){
    temp += "  "
  }
  return temp
}
