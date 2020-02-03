import { decorate, observable, toJS } from "mobx";
import getSequence from "../Utils/sequenceCreator";

class DragStore {
  currentCounter = 0;

  dropDrawing = observable({});

  drop = (options = {}, sequence = []) => {
    let parent = this.dropDrawing;

    (sequence || []).forEach(id => {
      parent = parent[id].value;
    });
    let __newId = getSequence();
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
}

decorate(DragStore, {
  currentCounter: observable,
  dropDrawing: observable
});

export default new DragStore();
