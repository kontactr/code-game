import React from "react";
import "./ConditionalFunction.css"
import  getSequence from "../../Utils/sequenceCreator";
import { toJS } from "mobx";



class ConditionalFunction extends React.Component {

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
    
    const { __internalSequence = [] } = operation.value

    return (
    <>
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
    
    return <>Hello World</>
    
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
     `for(let ${id}=${1} ; ${id}<=${start} ; ${id}++) {\n`
   ]
 }

}

export default ConditionalFunction;
