import React, { Component } from "react";
import "./DragSidebar.css";

import { observer, inject } from "mobx-react";

class DragSideBar extends Component {
  render() {
    const { dragStore = {} } = this.props;
    const { BUTTONS } = dragStore;

    return (
      <div className="drag-side-bar">
        {Object.keys(BUTTONS).map(key => {
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
