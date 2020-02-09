import React, { Component } from "react";
import "./FunctionName.css";
import { toJS } from "mobx";

export default class FunctionName extends Component {
  render() {
    const { operation } = this.props;
    return (
      <div className="function-name-function">
        {operation.mode}
      </div>
    );
  }

  static deComposeScalarValues = containerTree => {
    let flatMapArray = [];

    if (containerTree.scalar) {
      return [containerTree];
    } else if ((containerTree.mode || "").includes("C_FC_")) {
      //let loopLimiter = containerTree.getMovementValue && containerTree.getMovementValue()

      Object.keys(containerTree.__value || {}).forEach(functionSyntax => {
        let fun = containerTree.__value[functionSyntax];
        if (fun.scalar) {
          flatMapArray.push(fun);
        } else if ((fun.mode || "").includes("C_FC_")) {
          flatMapArray = flatMapArray.concat(this.deComposeScalarValues(fun));
        } else {
          if (fun.deComposeScalarValues)
            flatMapArray = flatMapArray.concat(fun.deComposeScalarValues(fun));
        }
      });
      return flatMapArray;
    } else {
      return containerTree.deComposeScalarValues(containerTree);
    }
  };

  static generateFunctionString(operation) {
    return `${operation.mode}();\n`;
  }

  static generateRaw = (operation, context) => {
    context.__fncInternal = "CALL";
    return {
      id: operation.id,
      value: {
        [operation.parentId]: {
          generateRaw: () => {
            return { id: [operation.parentId], value: operation.__value };
          }
        }
      }
    };
  };
}
