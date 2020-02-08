import React, { Component } from "react";
import "./DrawCanvas.css";
import { observer, inject } from "mobx-react";
import {
  generateScalarFunctionsToRun,
  generateRawDependency,
  hoisting,
  generateRawTree,
  checkCycle,
  checkStructureBasedOnComponents
} from "../FunctionsIndex/FunctionsIndex";
import {
  drawInitPlayer,
  performGameAnimation,
  restoreGrid
} from "./CanavasManager";
import { toJS } from "mobx";
import { STATUSES_PERCENT, STATUSES } from "../../Utils/constants";

class DrawCanvas extends Component {
  state = {
    width: 505,
    height: 606
  };

  render() {
    const { width = 505, height = 606 } = this.state;

    return (
      <div className="canvas-container">
        <canvas
          className="canvas-pallet"
          height={485}
          width={500}
          ref={ref => {
            if (ref) {
              this.canvasRef = ref;
              this.context = ref.getContext("2d");
            }
          }}
        />
      </div>
    );
  }

  async componentDidMount() {
    const { canvasStore = {} } = this.props;
    const { images = [] } = canvasStore;
    let allImages = await images;
    restoreGrid(this.context, allImages);
    this.resetGame();
  }

  resetGame = async () => {
    const { canvasStore = {}, playerStore = {} } = this.props;
    const { images = [] } = canvasStore;
    const { initUser = () => {} } = playerStore || {};
    let allImages = await images;
    restoreGrid(this.context, allImages);
    let currentPosition = drawInitPlayer(this.context, allImages["wp_back"]);
    initUser({
      currentSide: "B",
      currentPosition,
      registerGameStartCallback: this.registerGameStartCallback
    });
  };

  registerGameStartCallback = async () => {
    const {
      canvasStore = {},
      playerStore = {},
      dragStore = {},
      progressStore = {}
    } = this.props;

    const { images = [] } = canvasStore;
    const { dropDrawing = {} } = dragStore;
    const {
      toggleProgressDisplay,
      changeState = () => {},
      setGamePlayFunction = () => {}
    } = progressStore;

    let allImages = await images;
    let overallProgress = true;
    let cyclicTree = {};
    let checkCyclicTreeForCycle = false;
    let scopeError = false;
    let functionsArray = [];

    toggleProgressDisplay();

    if (overallProgress) {
      try {
        changeState("reset", STATUSES.ACTIVE, 100);
        await this.resetGame();
        changeState("reset", STATUSES.SUCCESS, 100);
      } catch (e) {
        overallProgress = false;
        changeState("reset", STATUSES.EXCEPTION, 100);
      }
    } else {
      overallProgress = false;
      changeState("reset", STATUSES.EXCEPTION, 100);
    }

    if (overallProgress) {
      changeState("fetchTree", STATUSES.ACTIVE, 100);
      if (dropDrawing !== undefined) {
        changeState("fetchTree", STATUSES.SUCCESS, 100);
      } else {
        changeState("fetchTree", STATUSES.EXCEPTION, 100);
      }
    } else {
      overallProgress = false;
      changeState("fetchTree", STATUSES.EXCEPTION, 100);
    }

    if (overallProgress) {
      try {
        changeState("rawTree", STATUSES.ACTIVE, 100);
        cyclicTree = generateRawTree(dropDrawing);
        changeState("rawTree", STATUSES.SUCCESS, 100);
      } catch (e) {
        cyclicTree = {};
        overallProgress = false;
        changeState("rawTree", STATUSES.EXCEPTION, 100);
      }
    } else {
      cyclicTree = {};
      overallProgress = false;
      changeState("rawTree", STATUSES.EXCEPTION, 100);
    }

    if (overallProgress) {
      try {
        changeState("cycleCheck", STATUSES.ACTIVE, 100);
        checkCyclicTreeForCycle = checkCycle(cyclicTree);
        console.log(checkCyclicTreeForCycle, 84444);

        if (checkCyclicTreeForCycle) {
          changeState("cycleCheck", STATUSES.EXCEPTION, 100);
          overallProgress = false;
        } else {
          changeState("cycleCheck", STATUSES.SUCCESS, 100);
        }
      } catch (e) {
        overallProgress = false;
        changeState("cycleCheck", STATUSES.EXCEPTION, 100);
      }
    } else {
      overallProgress = false;
      changeState("cycleCheck", STATUSES.EXCEPTION, 100);
    }

    if (overallProgress) {
      try {
        changeState("scopeCheck", STATUSES.ACTIVE, 100);
        scopeError = checkStructureBasedOnComponents(dropDrawing);
        console.log(scopeError, 89);

        if (scopeError) {
          changeState("scopeCheck", STATUSES.EXCEPTION, 100);
          overallProgress = false;
        } else {
          changeState("scopeCheck", STATUSES.SUCCESS, 100);
        }
      } catch (e) {
        console.log(e, 166);
        overallProgress = false;
        changeState("scopeCheck", STATUSES.EXCEPTION, 100);
      }
    } else {
      overallProgress = false;
      changeState("scopeCheck", STATUSES.EXCEPTION, 100);
    }

    if (overallProgress) {
      try {
        changeState("convertScalar", STATUSES.ACTIVE, 100);
        functionsArray = generateScalarFunctionsToRun(dropDrawing || {});

        if (functionsArray === undefined) {
          changeState("convertScalar", STATUSES.EXCEPTION, 100);
          overallProgress = false;
        } else {
          changeState("convertScalar", STATUSES.SUCCESS, 100);
        }
      } catch (e) {
        console.log(e);
        overallProgress = false;
        changeState("convertScalar", STATUSES.EXCEPTION, 100);
      }
    } else {
      overallProgress = false;
      changeState("convertScalar", STATUSES.EXCEPTION, 100);
    }

    if (overallProgress) {
      if (functionsArray.length) {
        setGamePlayFunction(() => {
          performGameAnimation({
            ...playerStore,
            functionScalarArray: functionsArray || [],
            allImages,
            context: this.context,
            canvasHeight: 485,
            canvasWidth: 500
          });
        });
      } else {
        setGamePlayFunction(() => {});
      }
    }
  };
}

export default inject(
  "canvasStore",
  "playerStore",
  "dragStore",
  "progressStore"
)(observer(DrawCanvas));
