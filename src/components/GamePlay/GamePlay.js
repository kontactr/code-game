import React, { Component } from "react";
import { Icon, Modal, Tabs } from "antd";
import  images from '../../Images'
import "./GamePlay.css";
import { spacePrettify } from "../FunctionsIndex/FunctionsIndex";

const { htmlCoding = "" } = images || {}
const { TabPane } = Tabs;

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
    const stringCodes =  onFunctionTree() || []
    return (<Modal
          title={title}
          visible={display}
          onOk={onOk}
          onCancel={onCancel}
          className={"modal-container"}
          
        >
         <Tabs defaultActiveKey="1">
            <TabPane tab="Code" key="1">
                  <code>
                    { this.generateJSX(stringCodes) || <>No Data To Parse</>}
                 </code>
            </TabPane>
            <TabPane tab="Space Prettify" key="2">
                  <code>
                    {this.generateJSX(spacePrettify(stringCodes)) || <>No Data To Parse</>}
                 </code>
            </TabPane>
         </Tabs>
        </Modal>)
  }

  generateJSX = (arr = []) => {
    if(arr.length){
      return (arr).map((line) => {
        return (<>
        <pre>{line}</pre>
        </>)
      })
    }else{
      return <>
      <pre>No data to parse</pre>
      </>
    }
  }

}
