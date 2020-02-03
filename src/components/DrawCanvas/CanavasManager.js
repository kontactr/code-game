import { toJS } from "mobx";

export const drawGreenGrass = (context, image) => {
  if (image && context) {
    context.save();
    context.scale(0.225, 0.222);
    for (let i = 0; i <= 3; i++) {
      for (let j = 0; j <= 3; j++) context.drawImage(image, 557 * i, 550 * j); //547
    }
    context.restore();
  }
};

export const drawSand = (context, image) => {
  if (image && context) {
    context.save();
    context.scale(0.225, 0.222);
    for (let i = 2; i <= 2; i++) {
      for (let j = 0; j <= 3; j++) context.drawImage(image, 557 * j, 550 * i); //547
    }
    context.restore();
  }
};

export const drawGround = (context, image) => {
  if (image && context) {
    context.save();
    context.scale(0.225, 0.222);
    for (let i = 3; i <= 3; i++) {
      for (let j = 0; j <= 3; j++) context.drawImage(image, 557 * j, 550 * i); //547
    }
    context.restore();
  }
};

export const drawSky = (context, image) => {
  if (image && context) {
    context.save();
    context.scale(0.225, 0.222);
    for (let i = 0; i <= 0; i++) {
      for (let j = 0; j <= 3; j++) context.drawImage(image, 557 * j, 550 * i); //547
    }
    context.restore();
  }
};

export const drawSkyFull = (
  context,
  image,
  startHorizontal = 0,
  tillHorizontal = 0
) => {
  if (image && context) {
    context.save();
    context.scale(0.15, 0.112);
    for (let i = startHorizontal; i <= tillHorizontal; i++) {
      for (let j = 0; j <= 3; j++) context.drawImage(image, 557 * j, 550 * i); //547
    }
    context.restore();
  }
};

export const drawWater = (context, image) => {
  if (image && context) {
    context.save();
    context.scale(0.225, 0.222);
    for (let i = 1; i <= 1; i++) {
      for (let j = 0; j <= 3; j++) context.drawImage(image, 557 * j, 550 * i); //547
    }
    context.restore();
  }
};

export const drawInitPlayer = (context, image) => {
  if (image && context) {
    context.save();
    context.scale(0.11, 0.11);
    context.drawImage(image, 1150 * 0, 1110 * 3); //547
    context.restore();
    return { x: 0, y: 3, defaultXModifier: 1150, defaultYModifier: 1110 };
  }
  return null;
};

export const drawPlayer = (context, image) => {
  if (image && context) {
    context.save();
    context.scale(0.11, 0.11);
    for (let x = 0; x < 4; x++)
      for (let y = 0; y < 4; y++) context.drawImage(image, 1150 * x, 1110 * y); //547
    context.restore();
  }
};

const drawMovementUp = ({
  context,
  allImages,
  currentPosition,
  setCurrentPosition,
  currentSide,
  setCurrentSide
}) => {
  return new Promise((resolve, reject) => {
    if (allImages && context && currentPosition) {
      let { x, y, defaultXModifier, defaultYModifier } = currentPosition;
      if (y > 0) {
        let stopValue = (y - 1) * defaultYModifier;
        let startYValue = y * defaultYModifier;
        let startXValue = x * defaultXModifier;

        playerSideCheckAndChange(
          context,
          allImages,
          startXValue,
          startYValue,
          currentSide,
          "B",
          setCurrentSide
        );

        function movement(xValue, yValue) {
          restoreGrid(context, allImages);
          context.save();
          context.scale(0.11, 0.11);
          context.drawImage(allImages["wp_back"], xValue, yValue);
          context.restore();
        }

        function __moveUpAnimation() {
          if (startYValue > stopValue && startYValue - stopValue >= 10) {
            movement(startXValue, startYValue);
            startYValue -= 10;
            requestAnimationFrame(__moveUpAnimation);
          } else {
            movement(startXValue, stopValue);
            setCurrentPosition({
              x,
              y: y - 1,
              defaultXModifier,
              defaultYModifier
            });
            resolve();
          }
        }
        __moveUpAnimation();
      } else {
        resolve(); // Temp, limit check excluded
      }
    } else {
      reject();
    }
  });
};

const drawMovementRight = ({
  context,
  allImages,
  currentPosition,
  setCurrentPosition,
  currentSide,
  setCurrentSide
}) => {
  return new Promise((resolve, reject) => {
    if (allImages && context && currentPosition) {
      let { x, y, defaultXModifier, defaultYModifier } = currentPosition;
      if (x < 3) {
        let stopValue = (x + 1) * defaultXModifier;
        let startYValue = y * defaultYModifier;
        let startXValue = x * defaultXModifier;

        playerSideCheckAndChange(
          context,
          allImages,
          startXValue,
          startYValue,
          currentSide,
          "R",
          setCurrentSide
        );

        function movement(xValue, yValue) {
          restoreGrid(context, allImages);
          context.save();
          context.scale(0.11, 0.11);
          context.drawImage(allImages["wp_right"], xValue, yValue);
          context.restore();
        }

        function __moveRightAnimation() {
          if (startXValue < stopValue && stopValue - startXValue >= 10) {
            movement(startXValue, startYValue);
            startXValue += 10;
            requestAnimationFrame(__moveRightAnimation);
          } else {
            movement(stopValue, startYValue);
            setCurrentPosition({
              x: x + 1,
              y,
              defaultXModifier,
              defaultYModifier
            });
            resolve();
          }
        }
        __moveRightAnimation();
      } else {
        resolve(); // Temp resolve
      }
    } else {
      reject();
    }
  });
};

const drawMovementLeft = ({
  context,
  allImages,
  currentPosition,
  setCurrentPosition,
  currentSide,
  setCurrentSide
}) => {
  return new Promise((resolve, reject) => {
    if (allImages && context && currentPosition) {
      let { x, y, defaultXModifier, defaultYModifier } = currentPosition;
      if (x > 0) {
        let stopValue = (x - 1) * defaultXModifier;
        let startYValue = y * defaultYModifier;
        let startXValue = x * defaultXModifier;

        playerSideCheckAndChange(
          context,
          allImages,
          startXValue,
          startYValue,
          currentSide,
          "L",
          setCurrentSide
        );

        function movement(xValue, yValue) {
          restoreGrid(context, allImages);
          context.save();
          context.scale(0.11, 0.11);
          context.drawImage(allImages["wp_left"], xValue, yValue);
          context.restore();
        }

        function __moveLeftAnimation() {
          if (startXValue > stopValue && startXValue - stopValue >= 10) {
            movement(startXValue, startYValue);
            startXValue -= 10;
            requestAnimationFrame(__moveLeftAnimation);
          } else {
            movement(stopValue, startYValue);
            setCurrentPosition({
              x: x - 1,
              y,
              defaultXModifier,
              defaultYModifier
            });
            resolve();
          }
        }
        __moveLeftAnimation();
      } else {
        resolve();
      }
    } else {
      reject();
    }
  });
};

const drawMovementDown = ({
  context,
  allImages,
  currentPosition,
  setCurrentPosition,
  currentSide,
  setCurrentSide
}) => {
  return new Promise((resolve, reject) => {
    if (allImages && context && currentPosition) {
      let { x, y, defaultXModifier, defaultYModifier } = currentPosition;
      if (y < 3) {
        let stopValue = (y + 1) * defaultYModifier;
        let startYValue = y * defaultYModifier;
        let startXValue = x * defaultXModifier;

        playerSideCheckAndChange(
          context,
          allImages,
          startXValue,
          startYValue,
          currentSide,
          "F",
          setCurrentSide
        );

        function movement(xValue, yValue) {
          restoreGrid(context, allImages);
          context.save();
          context.scale(0.11, 0.11);
          context.drawImage(allImages["wp_front"], xValue, yValue);
          context.restore();
        }

        function __moveDownAnimation() {
          if (startYValue < stopValue && stopValue - startYValue >= 10) {
            movement(startXValue, startYValue);
            startYValue += 10;
            requestAnimationFrame(__moveDownAnimation);
          } else {
            movement(startXValue, stopValue);
            setCurrentPosition({
              x,
              y: y + 1,
              defaultXModifier,
              defaultYModifier
            });
            resolve();
          }
        }
        __moveDownAnimation();
      } else {
        resolve();
      }
    } else {
      reject();
    }
  });
};

export const playerSideCheckAndChange = (
  context,
  allImages,
  XValue,
  YValue,
  playerSide = "B",
  nextMoveSide = "B",
  setterSideFunction = () => {}
) => {
  if (playerSide === nextMoveSide) return;
  restoreGrid(context, allImages);
  let image = {
    B: allImages["wp_back"],
    F: allImages["wp_front"],
    R: allImages["wp_right"],
    L: allImages["wp_left"]
  };
  context.save();
  context.scale(0.11, 0.11);
  context.drawImage(image[nextMoveSide], XValue, YValue);
  context.restore();
  setterSideFunction(nextMoveSide);
};

export const restoreGrid = (context, allImages) => {
  return new Promise((resolve, reject) => {
    if (context && allImages) {
      context.clearRect(0, 0, 500, 485);
      drawSand(context, allImages["sand"]);
      drawWater(context, allImages["water"]);
      drawGround(context, allImages["ground"]);
      drawSky(context, allImages["sky"]);
      resolve();
    } else {
      reject();
    }
  });
};

const scalarCanavsFunctions = {
  UP: drawMovementUp,
  DOWN: drawMovementDown,
  LEFT: drawMovementLeft,
  RIGHT: drawMovementRight
};

export const performGameAnimation = animationSettings => {
  const {
    getCurrentPosition,
    context,
    playerImages,
    allImages,
    setCurrentPosition,
    getCurrentSide,
    setCurrentSide,
    functionTree,
    functionScalarArray = []
  } = animationSettings;

  functionScalarArray.reduce((current, functionToRun) => {
    return current.then(() => {
      let currentPosition = getCurrentPosition();
      let currentSide = getCurrentSide();

      return scalarCanavsFunctions[functionToRun.mode]({
        context,
        allImages,
        currentPosition,
        setCurrentPosition,
        currentSide,
        setCurrentSide
      });
    });
  }, restoreGrid(context, allImages));
};
