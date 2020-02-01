import React, { Component } from "react";
import "./DragSidebar.css";
import { BUTTONS } from "../../Utils/constants";
import { observer, inject } from "mobx-react";

class DragSideBar extends Component {
  processedButtons = (() => {
    let temp = Object.keys(BUTTONS);
    return () => [temp, BUTTONS];
  })();

  render() {
    const [buttons, buttonObject] = this.processedButtons();
    const { dragStore = {} } = this.props;
    return (
      <div className="drag-side-bar">
        {buttons.map(key => {
          return (
            <div
              className="hello"
              key={key}
              id={key}
              draggable={true}
              onDragStart={event => {
                event.dataTransfer.setData(
                  "operation_data",
                  JSON.stringify({
                    mode: key
                  })
                );
              }}
            >
              {key}
            </div>
          );
        })}
      </div>
    );
  }
}

export default inject("dragStore")(observer(DragSideBar));
