import { decorate, observable, action, toJS } from "mobx";

class PlayerStore {
  currentStep = 0;
  currentSide = "B";
  playerImages = {};
  currentPosition = observable({
    x: 0,
    y: 0,
    defalutXModifier: 0,
    defaultYModifier: 0
  });

  setCurrentPosition = position => {
    console.log(position, 1230);
    this.currentPosition = {
      x: position.x,
      y: position.y,
      defaultXModifier: position.defaultXModifier,
      defaultYModifier: position.defaultYModifier
    };
  };

  getCurrentPosition = () => {
    return this.currentPosition;
  };

  getCurrentSide = () => {
    return this.currentSide;
  };

  registerGameStartCallback = () => {};

  initUser = settings => {
    const {
      playerImages,
      currentPosition,
      currentSide,
      registerGameStartCallback = () => {}
    } = settings;

    //this.playerImages = playerImages;
    this.currentPosition = currentPosition;
    this.currentSide = currentSide;
    this.registerGameStartCallback = registerGameStartCallback;
  };

  setCurrentSide = (value = "B") => {
    this.currentSide = value;
  };

  startGame = () => {
    this.registerGameStartCallback();
  };
}

decorate(PlayerStore, {
  currentStep: observable,
  currentSide: observable,
  playerImages: observable,
  currentPosition: observable,

  initUser: action,
  startGame: action
});

export default new PlayerStore();
