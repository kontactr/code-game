
import { decorate, observable, action , toJS } from "mobx";
import getSequence from "../Utils/sequenceCreator";
import { observer } from "mobx-react";

class DragStore {
  currentCounter = 0;

  dropDrawing = observable({});

  drop = (options = {}, sequence = [], __newId = getSequence()) => {
    let parent = this.dropDrawing;

    console.log(toJS(sequence), 12);

    (sequence || []).forEach(id => {
      parent = parent[id].value;
    });

    parent[__newId] = observable(
      {
        id: __newId,
        ...options
      } || {}
    );
  };

  dropDrawingPass = (func = () => {}) => {
    return func(this.dropDrawing);
  };

  BUTTONS = observable({
    UP: { key: "UP", mode: "UP" },
    DOWN: { key: "DOWN", mode: "DOWN" },
    LEFT: { key: "LEFT", mode: "LEFT" },
    RIGHT: { key: "RIGHT", mode: "RIGHT" },
    LOOP: { key: "LOOP", mode: "LOOP" },
    FUNCTION: { key: "FUNCTION", mode: "FUNCTION" }
  });

  addButtonsToDrawer = ({ mode = "", key = "" } = {}) => {
    if (!this.BUTTONS[mode] && mode && key) {
      this.BUTTONS[mode] = {
        mode,
        key
      };
    }
  };

  deleteButtonsToDrawer = mode => {
    if (mode) delete this.BUTTONS[mode];
  };
}

decorate(DragStore, {
  currentCounter: observable,
  dropDrawing: observable,
  BUTTONS: observable,
  addButtonsToDrawer: action,
  deleteButtonsToDrawer: action
});

export default new DragStore();
