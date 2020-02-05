import React from "react";
import "./ConditionalFunction.css"
import  getSequence from "../../Utils/sequenceCreator";
import { toJS } from "mobx";
import { generateJSXForFunctions } from "../FunctionsIndex/FunctionsIndex";



class ConditionalFunction extends React.Component {

  state = {
    conditionalState: 1
  }

  getMovementValues = () => {
    return this.state.conditionalState 
  }

  onChangeHandler = (e) => {
    this.setState({
      conditionalState: e.target.value
    })
  }
  
  render = () => {
    const { operation, children } = this.props;
    const { conditionalState } = this.state || {};
    
    const { __internalSequence = [] } = operation.value

    return (
    <>
      <select className="if-else-select" onChange={this.onChangeHandler} value={conditionalState}>
        <option value={1}>True</option>
        <option value={0}>False</option>
      </select>
      <div
        className="loop-function"
        onDrop={e => {
          e.preventDefault();
          if (e.target.dataset.appIds) {
            e.target.dataset.appIds +=  __internalSequence[0]   + "," + operation.id + ",";
          } else {
            e.target.dataset.appIds = __internalSequence[0]   + "," + operation.id + ",";
          }
        }}
        onDragOver={e => {
          e.preventDefault();
        }}
      >
        {this.renderChild(operation.value[__internalSequence[0]])}
      </div>
      <div
        className="loop-function"
        onDrop={e => {
          e.preventDefault();

          if (e.target.dataset.appIds) {
            e.target.dataset.appIds += __internalSequence[1]   + "," + operation.id + ",";
          } else {
            e.target.dataset.appIds = __internalSequence[1]   + "," + operation.id + ",";
          }
        }}
        onDragOver={e => {
          e.preventDefault();
        }}>
          {this.renderChild(operation.value[__internalSequence[1]])}
        </div> 
    </> )
  };

   renderChild = (drawingTree) => {
    let r = Object.keys(drawingTree.value || {}).length
    if(r){
      return generateJSXForFunctions(drawingTree.value)
    }
    return <></>
    
  }

  static composeValue = operation => {
    let a = getSequence()
    let b = getSequence()
    return {
      mode: "IF-ELSE",
      value: {
        [a] : {
          value: {

          }
        },
        [b] : {
          value: {

          }
        },
        __internalSequence: [a,b]
      },
      renderChild: true,
      scalar: false,
      key: "IF-ELSE",
    };
  };

 deComposeScalarValues = (containerTree) => {

    let flatMapArray = []
    if(containerTree.scalar) { return [containerTree] }
    else if(containerTree.mode === "IF-ELSE"){
      let conditionResult = containerTree.getMovementValue && containerTree.getMovementValue()
      
      let operationValue = containerTree.value
      let inteseq = operationValue.__internalSequence
      let chooseWhichToOperate = ((Number(conditionResult) || 0) && inteseq[0]) || inteseq[1]
      
      let selectedResult = operationValue[chooseWhichToOperate]

        Object.keys(selectedResult.value || {}).forEach((functionSyntax) => {
        let fun = selectedResult.value[functionSyntax]
        if(fun.scalar){
          flatMapArray.push(fun)
        }else if(fun.mode === "IF-ELSE"){
         flatMapArray =  flatMapArray.concat(this.deComposeScalarValues(fun))
        }else{
          if(fun.deComposeScalarValues)
         flatMapArray =  flatMapArray.concat(fun.deComposeScalarValues(fun))
        }
      } )
      return flatMapArray
    }else{
      return containerTree.deComposeScalarValues(containerTree)
    }
 }

 generateFunctionString = (containerTree) => {
  
  if(containerTree.scalar) { return [containerTree.generateFunctionString()] }
  else if(containerTree.mode === "IF-ELSE" ){
        let conditionResult = containerTree.getMovementValue && containerTree.getMovementValue()
        let loopStringArray = [this.generateIfString(conditionResult)]
        let operationValue = containerTree.value
        let inteseq = operationValue.__internalSequence
        
        let ifBlock = operationValue[inteseq[0]]

        loopStringArray = loopStringArray.concat(this.genericStringStructure(ifBlock) , this.generateElseString() )
        
        let elseBlock = operationValue[inteseq[1]]
        
        loopStringArray = loopStringArray.concat(this.genericStringStructure(elseBlock))

        loopStringArray.push("} \n" )
    
     return loopStringArray
  }else{
    if(containerTree.generateFunctionString){
      return [containerTree.generateFunctionString(containerTree)]
    }else{
      return []
    }
  }
 }


 genericStringStructure = (containerTree) => {

  let loopStringArray = []

  Object.keys(containerTree.value || {}).forEach((functionSyntax) => {

        let fun = containerTree.value[functionSyntax]
        if(fun.scalar){
          loopStringArray.push(fun.generateFunctionString())
        }else if(fun.mode === "IF-ELSE"){
         loopStringArray =  loopStringArray.concat(this.generateFunctionString(fun))
        }else{
          if(fun.deComposeScalarValues)
         loopStringArray =  loopStringArray.concat(fun.generateFunctionString(fun))
        }
      } )

    return loopStringArray
 }

 generateIfString = (value) => {
   return `if (${ ((Number(value) || 0) && "true") || "false" }) {\n`
 }

 generateElseString = (value) => {
   return `} else { \n`
 }

}

export default ConditionalFunction;
