import React, { Component } from "react";
import "./DropDrawBar.css";
import { inject, observer } from "mobx-react";
import {
  generateJSXForFunctions,
  generateComposeValue
} from "../FunctionsIndex/FunctionsIndex";
import getSequence from "../../Utils/sequenceCreator";
import { toJS } from "mobx";

class DropDrawBar extends Component {
  dropEvent = event => {
    event.preventDefault();

    const { dragStore } = this.props;
    const { drop = () => {}, dropDrawing = {} } = dragStore || {};

    let eventData = JSON.parse(
      event.dataTransfer.getData("operation_data") || {}
    );
    let appIds = (event.target.dataset && event.target.dataset.appIds) || "";

    if (appIds) {
      appIds = appIds.split(",").filter(Boolean).reverse();
      event.target.dataset.appIds = "";
      // Here we have to reset appIds because of data persistance.
      // JS persist appIds of the previous event aka synthesis event.
      // that's why you never get the whole series perfect
      // they simply append new data with the previous one.
    } else {
      appIds = [];
    }

    let __newId = getSequence();
    drop(
      generateComposeValue(eventData.mode, appIds, dropDrawing, __newId),
      appIds,
      __newId
    );
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
    toJS(dropDrawing);
    return generateJSXForFunctions(dropDrawing);
  };
}

export default inject("dragStore")(observer(DropDrawBar));
