import React from "react";
import UpFunction from "../UpFunction/UpFunction";
import DownFunction from "../DownFunction/DownFunction";
import LeftFunction from "../LeftFunction/LeftFunction";
import RightFunction from "../RightFunction/RightFunction";
import LoopFunction from "../LoopFunction/LoopFunction";
import FunctionFirst from '../FunctionFirst/FunctionFirst'
import ConditionalFunction from '../ConditionalFunction/ConditionalFunction'
import { toJS } from "mobx";
import "./FunctionIndex.css"
import { Icon } from "antd";


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
    composeValue: LeftFunction.composeValue,
  },
  RIGHT: {
    mode: "RIGHT",
    Component: RightFunction,
    composeValue: RightFunction.composeValue
  },
  FUNCTION: {
    mode: "FUNCTION",
    Component: FunctionFirst,
    composeValue: FunctionFirst.composeValue,
    customValidation: FunctionFirst.customValidation
  },
"IF-ELSE": {
    mode: "IF-ELSE",
    Component: ConditionalFunction,
    composeValue: ConditionalFunction.composeValue
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
  
  return modeToComponent[mode].composeValue(mode , pathIds , drawingData);
}


export const generateJSXForFunctions = (drawingTree = {}) => {
  let objectKeys = Object.keys(drawingTree || {})
  if(!objectKeys.length) {return (<></>)}
    
  return objectKeys.map((operation) => {
    let value = drawingTree[operation].value;
    let mode = drawingTree[operation].mode ;
  

    let objectOrNot = !drawingTree[operation].scalar  // typeof value === 'object' && value !== null
       let decideWhoRenderChildren = drawingTree[operation].renderChild
    const Component = modeToComponent[mode].Component


    if(objectOrNot){
       return (
       <div className="close-container" key={drawingTree[operation].id || new Date()  } > 
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
          drawingTree[operation]["generateRaw"] =  refMarker.generateRaw
          drawingTree[operation]["ref"] = refMarker
        }
       }} >
          {!decideWhoRenderChildren &&  generateJSXForFunctions(value)  }
       </Component>
       </div>
       )
      
    }else{
      return (
        <div className="close-container" key={drawingTree[operation].id || new Date()  }>
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
          drawingTree[operation]["generateRaw"] =  refMarker.generateRaw
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
      let openingCount = ((line || '').match(/{/g) || []).length
      let closingCount = ((line || '').match(/}/g) || []).length
      if(openingCount > closingCount){
          let string = generateSpaceString(spaceCounter)+line
          spaceCounter += 2
          return string
      }else if(openingCount < closingCount){
          spaceCounter -= 2
          return generateSpaceString(spaceCounter)+line
      }else if(openingCount === closingCount && openingCount !== 0){
          spaceCounter -= 2
          let t =  generateSpaceString(spaceCounter)+line
          spaceCounter += 2
          return t
      }else {
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

export const generateRawTree = (drawingTree , visitingTree = [] , context = {}  ) => {
  
  if(!drawingTree) return null

  let resulingTree = {}
  let treeKeys = Object.keys( drawingTree || {}  );

  (treeKeys || []).forEach((key) => {    
    let operation = drawingTree[key]
    //let clonedContext = toJS(context)
    
    let result = operation.generateRaw(operation , context)
    if(visitingTree.includes(result.id)){
      resulingTree[result.id] = null
    }else{
      visitingTree.push(result.id)
      resulingTree[result.id] = generateRawTree(result.value , visitingTree.slice(0) , context)
    }
    
  })
  if(treeKeys.length){
    return resulingTree
  }else{
    return null
  }
}

export const hoisting = (drawingTree) => {
    console.log(drawingTree , 241)  
}

export const checkCycle = (drawingTree = {} , visitedValues = []) => {
  let result = false
  
  for (let key of Object.keys(drawingTree || {})){

    let value = drawingTree[key]
    let clonedArray = visitedValues.slice(0)
    
    if(value){
      if(clonedArray.includes(key)){
        result = result || true
        return result
      }else{
        clonedArray.push(key)
       result = result || checkCycle(value , clonedArray.slice(0))
      }
    }
  }
  return result
}

export const checkStructureBasedOnComponents = (drawingTree) => {
    let keys = Object.keys(modeToComponent || {})
    let result = false
    for (let key of keys){
        if (modeToComponent[key].customValidation){
          result = result || modeToComponent[key].customValidation(drawingTree)
          if (result){
            return result
          }
        }
    }
    return result
}



