import React, { Component } from "react";
import "./DrawCanvas.css";
import { observer, inject } from "mobx-react";
import {
  generateScalarFunctionsToRun,
  checkCyclicDependency
} from "../FunctionsIndex/FunctionsIndex";
import {
  drawInitPlayer,
  performGameAnimation,
  restoreGrid
} from "./CanavasManager";
import { toJS } from "mobx";

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
    let currentPosition = drawInitPlayer(this.context, allImages["wp_back"]);
    initUser({
      currentSide: "B",
      currentPosition,
      registerGameStartCallback: () => {
        const {
          canvasStore = {},
          playerStore = {},
          dragStore = {}
        } = this.props;
        const { dropDrawing = {} } = dragStore;

        this.resetGame();

        console.log(toJS(dropDrawing), 65);

        let cyclicTree = checkCyclicDependency(dropDrawing);

        console.log(toJS(cyclicTree), 69);

        if (!cyclicTree[1]) {
          let functionsArray = generateScalarFunctionsToRun(dropDrawing || {});

          performGameAnimation({
            ...playerStore,
            functionScalarArray: functionsArray || [],
            allImages,
            context: this.context,
            canvasHeight: 485,
            canvasWidth: 500
          });
        }
      }
    });
  };
}

export default inject("canvasStore", "playerStore", "dragStore")(
  observer(DrawCanvas)
);
