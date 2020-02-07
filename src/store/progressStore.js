import { decorate, observable } from "mobx";

class ProgressStore {
  progressModalTitle = "Code Compilation";
  progressModalDisplay = false;

  toggleProgressDisplay = () => {
    this.progressModalDisplay = !this.progressModalDisplay;
  };
}

decorate(ProgressStore, {
  progressModalTitle: observable,
  progressModalDisplay: observable
});

export default new ProgressStore();
