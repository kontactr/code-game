export const BUTTONS = {
  UP: { key: "UP", mode: "UP" },
  DOWN: { key: "DOWN", mode: "DOWN" },
  LEFT: { key: "LEFT", mode: "LEFT" },
  RIGHT: { key: "RIGHT", mode: "RIGHT" },
  LOOP: { key: "LOOP", mode: "LOOP" },
  "IF-ELSE": { key: "IF-ELSE", mode: "IF-ELSE" }
};

export const STATUSES = {
  NORMAL: "normal",
  SUCCESS: "success",
  EXCEPTION: "exception",
  ACTIVE: "active"
};

export const STATE_DISPLAY_NAMES = {
  reset: "Reset drawing",
  fetchTree: "Fetching stack",
  rawTree: "Generate raw values",
  cycleCheck: "Cycle check",
  scopeCheck: "Scope check",
  convertScalar: "Compile to raw functions"
};

export const STATUSES_PERCENT = { START: 0, COMPLETE: 100 };
