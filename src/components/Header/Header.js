import React, { Component } from "react";
import "./Header.css";
import GamePlay from "../GamePlay/GamePlay";
import { observer, inject } from "mobx-react";
import { generateCodeForFunctions } from "../FunctionsIndex/FunctionsIndex";
import { Modal, Button } from "antd";


class Header extends Component {
  render() {
    const { playerStore = {}, modalStore, dragStore = {} } = this.props;
    const { startGame = () => {} } = playerStore;
    const { dropDrawingPass = () => {} } = dragStore;
    const { title = 'Learn Code' , display = false , toggleDisplay = () => {} } = modalStore || {}

    return (
      <>
      <div className="header-container">
        <div className="button-container">
          <GamePlay
            onPlayButtonClick={() => {
              startGame();
            }}
            title={title}
            display={display}
            onOk={toggleDisplay}
            onCancel={toggleDisplay}
            onCodeButtonClick={toggleDisplay}
            onFunctionTree={() => {
              return  dropDrawingPass(generateCodeForFunctions);
              
            }}
          />
        </div>
      </div>
      </>
    );
  }
}

export default inject("playerStore", "dragStore", "modalStore")(
  observer(Header)
);
