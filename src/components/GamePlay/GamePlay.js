import React, { Component } from "react";
import { Icon } from "antd";
import "./GamePlay.css";

export default class GamePlay extends Component {
  render() {
    const { onPlayButtonClick = () => {} } = this.props;
    return (
      <Icon
        role="button"
        type="play-circle"
        className={"play-button"}
        theme="filled"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          onPlayButtonClick();
        }}
      />
    );
  }
}
