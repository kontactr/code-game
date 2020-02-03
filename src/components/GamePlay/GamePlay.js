import React, { Component } from "react";
import { Icon } from "antd";
import  images from '../../Images'
import "./GamePlay.css";

const { htmlCoding = "" } = images || {}

export default class GamePlay extends Component {
  render() {
    const { onPlayButtonClick = () => {} } = this.props;
    return (
      <>
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
      <img className="html-coding-icon" src={htmlCoding}>
      </img>
      </>
    );
  }
}
