import React, { Component } from "react";
import "./Footer.css";
import images from "../../Images";

const { thor, flash } = images;

export default class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <img className="flash-icon" src={thor} />
        Footer
        <img className="flash-icon" src={flash} />
      </div>
    );
  }
}
