import React, { Component } from "react";
import "./DropDrawBar.css";
import { inject, observer } from "mobx-react";
import {
  generateJSXForFunctions,
  generateComposeValue
} from "../FunctionsIndex/FunctionsIndex";

class DropDrawBar extends Component {
  dropEvent = event => {
    //event.stopPropagation();
    event.preventDefault();

    const { dragStore } = this.props;
    const { drop = () => {}, dropDrawing = {} } = dragStore || {};

    let eventData = JSON.parse(
      event.dataTransfer.getData("operation_data") || {}
    );
    let appIds = (event.target.dataset && event.target.dataset.appIds) || "";
    console.log(appIds, 21);
    if (appIds) {
      appIds = appIds.split(",").filter(Boolean).reverse();
      event.target.dataset.appIds = "";
    } else {
      appIds = [];
    }

    drop(generateComposeValue(eventData.mode, appIds, dropDrawing), appIds);
  };

  dragOverEvent = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div
        className="drop-draw-bar"
        onDrop={this.dropEvent}
        onDragOver={this.dragOverEvent}
      >
        {this.generateDrawings()}
      </div>
    );
  }

  generateDrawings = () => {
    const { dragStore } = this.props;
    const { dropDrawing = {} } = dragStore || {};
    return generateJSXForFunctions(dropDrawing);
  };
}

export default inject("dragStore")(observer(DropDrawBar));
