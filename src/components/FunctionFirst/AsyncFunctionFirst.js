import React from "react";
import "./FunctionFirst.css"
import  getSequence from "../../Utils/sequenceCreator";
import { generateJSXForFunctions, deleteModeToComponent, addModeToComponent } from "../FunctionsIndex/FunctionsIndex";
import { deleteButtonsToDrawer, addButtonsToDrawer } from "../../Utils/constants";
import FunctionName from "./FunctionName/FunctionName"
import "./FunctionFirst.css"
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";


class FunctionFirst extends React.Component {

  

  id  = getSequence()

  

  getMovementValues = () => {
    
  }


  componentWillUnmount(){
    const { dragStore = {} } = this.props || {};
    const { deleteButtonsToDrawer = () => {} } = dragStore
    deleteModeToComponent("ASYNC_C_FC_"+this.id);
    deleteButtonsToDrawer("ASYNC_C_FC_"+this.id)
  }

  componentDidMount(){
    

    const { dragStore = {} , operation , playerStore = () => {} } = this.props;
    const { addButtonsToDrawer = () => {} ,   } = dragStore
    const { addAsycFunctionsToQueue = () => {} } = playerStore

    

    addModeToComponent({
      mode: "ASYNC_C_FC_" + this.id,
      Component: FunctionName,
      composeValue: (...rest) => {
        return {
          mode: "ASYNC_C_FC_" + this.id,
          value: "ASYNC_C_FC_" + this.id,
          __value: operation.value,
          key: "ASYNC_C_FC_" + this.id,
          scalar: false,
          renderChild: true,
          parentId: operation.id,
          __type: "CALL",
          ___varient: "ASYNC",
          deComposeScalarValues: (operation) => {
            let composedValues = FunctionName.deComposeScalarValues(operation)
            addAsycFunctionsToQueue(composedValues)
            return []
          },
          generateFunctionString: FunctionName.generateFunctionString,
          generateRaw: FunctionName.generateRaw
        }
      }
    })

    addButtonsToDrawer({
      mode: "ASYNC_C_FC_" + this.id,
      key: "ASYNC_C_FC_" + this.id
    })
    
  }
  
  render = () => {
    const { operation, children } = this.props;
    const { functionName = '' } = this.state || {};

    return (
    <>
      <input type="text" className="function-name-input" value={"Name: ASYNC_C_FC_"+this.id} disabled>
      
      </input>
      <div
        className="loop-function"
        onDrop={e => {
          e.preventDefault();
          if (e.target.dataset.appIds) {
            e.target.dataset.appIds +=  operation.id + ",";
          } else {
            e.target.dataset.appIds = operation.id + ",";
          }
        }}
        onDragOver={e => {
          e.preventDefault();
        }}
      >
        {children}
      </div>
      
    </> )
  };

  deleteEffect = () => {
    // Function's delete effect
  }

  static composeValue = operation => {
    
    return {
      mode: "ASYNC_FUNCTION",
      value: {
      },
      scalar: false,
      __type: "DEFINATION",
      __varient: "ASYNC",
      key: "ASYNC_FUNCTION",
      
    };

  };

 deComposeScalarValues = (containerTree) => {
  return []
 }

 generateFunctionString = (containerTree) => {
  
  if(containerTree.scalar) { return [containerTree.generateFunctionString()] }
  else if(containerTree.mode === "ASYNC_FUNCTION" ){
    let functionName = containerTree.getMovementValue && containerTree.getMovementValue()
    let loopStringArray = [this.generateInternalFunctionString(functionName)]
    
    Object.keys(containerTree.value || {}).forEach((functionSyntax) => {
        let fun = containerTree.value[functionSyntax]
        if(fun.scalar){
          loopStringArray.push(fun.generateFunctionString())
        
        }else if(fun.mode === "ASYNC_FUNCTION"){
         loopStringArray =  loopStringArray.concat(this.generateFunctionString(fun))
        }else{
          if(fun.deComposeScalarValues)
         loopStringArray =  loopStringArray.concat(fun.generateFunctionString(fun))
        }
      } )

      if(loopStringArray.length === 1){
        loopStringArray.push("// No operation ;\n")
      }

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
 
 generateInternalFunctionString = (value) => {
   return `async function C_FC_${this.id}() {\n`
 }

 generateRaw = (operation , context) => {
  if(context && context.__fncInternal === "CALL"){
    context.__fncInternal = undefined
    return {id: operation.id , value: {}};
   }else{
     return {id: operation.id , value: {}};
   }
 }
 
}

export default   inject("dragStore" , "playerStore") (observer(FunctionFirst)) 
