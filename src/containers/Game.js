import React, { Component } from "react";
import DragSideBar from '../components/DragSideBar/DragSideBar'

import "./Game.css"
import DropDrawBar from "../components/DropDrawBar/DropDrawBar";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer"

export default class Game extends Component {
  render() {
    return (
      <>
      <div>
        <Header></Header>
      </div>
      <div id="root-container">
          <DragSideBar></DragSideBar>
          <DropDrawBar></DropDrawBar>          
      </div>
      <div>
        <Footer></Footer>
      </div>
      </>
    );
  }
}
