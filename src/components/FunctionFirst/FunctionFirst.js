import React from "react";
import "./FunctionFirst.css"
import  getSequence from "../../Utils/sequenceCreator";
import { generateJSXForFunctions, deleteModeToComponent, addModeToComponent } from "../FunctionsIndex/FunctionsIndex";
import { deleteButtonsToDrawer, addButtonsToDrawer } from "../../Utils/constants";
import FunctionName from "./FunctionName/FunctionName"
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";


class FunctionFirst extends React.Component {

  state = {
    functionName : ""
  }

  id  = getSequence()

  childs = []

  getMovementValues = () => {
    return this.state.functionName
  }

  onChangeHandler = (e) => {
    this.setState({
      functionName: e.target.value
    })
  }

  componentWillUnmount(){
    const { dragStore = {} } = this.props || {};
    const { deleteButtonsToDrawer = () => {} } = dragStore
    deleteModeToComponent("C_FC_"+this.id);
    deleteButtonsToDrawer("C_FC_"+this.id)
  }

  componentDidMount(){
    

    const { dragStore = {} , operation } = this.props;
    const { addButtonsToDrawer = () => {} ,  } = dragStore

    

    addModeToComponent({
      mode: "C_FC_" + this.id,
      Component: FunctionName,
      composeValue: (...rest) => {
        return {
          mode: "C_FC_" + this.id,
          value: "C_FC_" + this.id,
          __value: operation.value,
          key: "C_FC_" + this.id,
          scalar: false,
          renderChild: true,
          parentId: operation.id,
          __type: "CALL",
          deComposeScalarValues: FunctionName.deComposeScalarValues,
          generateFunctionString: FunctionName.generateFunctionString,
          generateRaw: FunctionName.generateRaw
        }
      }
    })

    addButtonsToDrawer({
      mode: "C_FC_" + this.id,
      key: "C_FC_" + this.id
    })
    
  }
  
  render = () => {
    const { operation, children } = this.props;
    const { functionName = '' } = this.state || {};

    return (
    <>
      <input type="text" value={"Name: C_FC_"+this.id} disabled>
      
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
      mode: "FUNCTION",
      value: {
      },
      scalar: false,
      __type: "DEFINATION",
      key: "FUNCTION",
      
    };

  };

 deComposeScalarValues = (containerTree) => {
  return []
 }

 generateFunctionString = (containerTree) => {
  
  if(containerTree.scalar) { return [containerTree.generateFunctionString()] }
  else if(containerTree.mode === "FUNCTION" ){
    let functionName = containerTree.getMovementValue && containerTree.getMovementValue()
    let loopStringArray = [this.generateInternalFunctionString(functionName)]
    
    Object.keys(containerTree.value || {}).forEach((functionSyntax) => {
        let fun = containerTree.value[functionSyntax]
        if(fun.scalar){
          loopStringArray.push(fun.generateFunctionString())
        
        }else if(fun.mode === "FUNCTION"){
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
   return `function C_FC_${this.id}() {\n`
 }

 generateRaw = (operation , context) => {
    return {id: operation.id , value: operation.value};
 }

 static customValidation = (drawingTree , definations = []) => {
   let result = false
   let scope = definations.concat( [] )
   
   
   let objectKeys = Object.keys(drawingTree || {})
   for(let key of objectKeys){
     if(drawingTree[key].__type === "DEFINATION"){
       scope.push(drawingTree[key].id)
     }else if(drawingTree[key].__type === "CALL"){
       if(scope.includes(drawingTree[key].parentId)){
          // pass operation
       }else{
          result = result || true
       }
     }
     if(result) return result
   }
   

   for(let key of objectKeys){
   

     let resultCompose = drawingTree[key].generateRaw(drawingTree[key])
      if(!resultCompose.value      /*drawingTree[key].scalar*/){ // we can direct use scalar if we don't want to use generateRaw values
        // no op                // just remove generate raw call and replace !resultCompose.value with
                                // drawingTree[key].scalar
      }else if(resultCompose.__type === "CALL"){
        // no op
      }else{
        
        let clonedScope = scope.slice(0)
        result = result || FunctionFirst.customValidation(resultCompose.value , clonedScope);
      }
      if(result) return result
   }

   return result
   
 }

}

export default   inject("dragStore") (observer(FunctionFirst)) 
