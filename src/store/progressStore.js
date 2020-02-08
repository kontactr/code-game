import { decorate, observable } from "mobx";
import { STATUSES, STATUSES_PERCENT } from "../Utils/constants";

class ProgressStore {
  progressModalTitle = "Code Compilation";
  progressModalDisplay = false;

  constructor() {
    this.resetSteps();
  }

  toggleProgressDisplay = () => {
    this.progressModalDisplay = !this.progressModalDisplay;
  };

  generateState = (
    progressValue = STATUSES_PERCENT.START,
    status = STATUSES.NORMAL
  ) => {
    return { progress: progressValue, status };
  };

  changeState = (stateName, stateStatus, stateValue) => {
    if (this.steps[stateName]) {
      this.steps[stateName] = this.generateState(stateValue, stateStatus);
    }
  };

  resetSteps = () => {
    this.steps = observable({
      reset: this.generateState(STATUSES_PERCENT.COMPLETE, STATUSES.ACTIVE),
      fetchTree: this.generateState(STATUSES_PERCENT.START, STATUSES.NORMAL),
      rawTree: this.generateState(STATUSES_PERCENT.START, STATUSES.NORMAL),
      cycleCheck: this.generateState(STATUSES_PERCENT.START, STATUSES.NORMAL),
      scopeCheck: this.generateState(STATUSES_PERCENT.START, STATUSES.NORMAL),
      convertScalar: this.generateState(STATUSES_PERCENT.START, STATUSES.NORMAL)
    });
  };
}

decorate(ProgressStore, {
  progressModalTitle: observable,
  progressModalDisplay: observable
});

export default new ProgressStore();
