import React, { Component } from "react";
import { Icon, Modal } from "antd";
import  images from '../../Images'
import "./GamePlay.css";

const { htmlCoding = "" } = images || {}

export default class GamePlay extends Component {
  render() {
    const { onPlayButtonClick = () => {} , onCodeButtonClick = () => {} , display } = this.props;
    
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
      <img className="html-coding-icon" src={htmlCoding} onClick={onCodeButtonClick}>
      </img>
      { display && this.generateModal() }
      </>
    );
  }

  generateModal = () => {
    const { display = false , title = "Learn Code" ,onOk = () => {} , onCancel = () => {} , onFunctionTree = () => {} } = this.props;
    return (<Modal
          style={{
            maxHeight: "80vh",
            overflowY: "auto"

          }}
          title={title}
          visible={display}
          onOk={onOk}
          onCancel={onCancel}
        >
         <code>
           { this.generateJSX(onFunctionTree())}
         </code>
        </Modal>)
  }

  generateJSX = (arr = []) => {
    if(arr.length){
      return (arr).map((line) => {
        return (<>
        {line}
        <br />
        </>)
      })
    }else{
      return <>No Data To Parse</>
    }
  }

}
