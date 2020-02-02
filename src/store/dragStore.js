import { decorate, observable, toJS } from "mobx";
import getSequence from "../Utils/sequenceCreator";

class DragStore {
  currentCounter = 0;

  dropDrawing = observable({});

  drop = (options = {}, sequence = []) => {
    let parent = this.dropDrawing;
    console.log(sequence, toJS(this.dropDrawing), 11);
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
}

decorate(DragStore, {
  currentCounter: observable,
  dropDrawing: observable
});

export default new DragStore();
