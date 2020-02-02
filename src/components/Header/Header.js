import React, { Component } from "react";
import "./Header.css";
import GamePlay from "../GamePlay/GamePlay";
import { observer, inject } from "mobx-react";

class Header extends Component {
  render() {
    const { playerStore = {} } = this.props;
    const { startGame = () => {} } = playerStore;
    return (
      <div className="header-container">
        <div className="button-container">
          <GamePlay
            onPlayButtonClick={() => {
              startGame();
            }}
          />
        </div>
      </div>
    );
  }
}

export default inject("playerStore")(observer(Header));
