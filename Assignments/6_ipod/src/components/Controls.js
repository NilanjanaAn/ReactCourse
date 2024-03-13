import "./css/controls.css";
import leftArrow from "./images/left-arrow.png";
import rightArrow from "./images/right-arrow.png";
import bottomArrow from "./images/arrow-pointing-downwards.png";
import { Component } from "react";
import ZingTouch from "zingtouch";

// introduce your own eventhandler for eac button Here.
class Controls extends Component {
  constructor() {
    super();
    this.angle = 0;
  }

  controlWheel = (e) => {
    const { changeMenu, currentMenu, innerMenu } = this.props;
    if (e.detail.distanceFromOrigin === 0) {
      this.angle = e.detail.angle;
    }
    if (Math.abs(this.angle - e.detail.angle) > 300) {
      this.angle = Math.abs(e.detail.angle);
      if (e.detail.distanceFromLast === 0) {
        return;
      } else if (e.detail.distanceFromLast < 0) {
        changeMenu(1, currentMenu, innerMenu);
      } else {
        changeMenu(0, currentMenu, innerMenu);
      }
    } else if (Math.abs(this.angle - e.detail.angle) > 15) {
      this.angle = Math.abs(e.detail.angle);
      if (e.detail.distanceFromLast === 0) {
        return;
      } else if (e.detail.distanceFromLast > 0) {
        changeMenu(1, currentMenu, innerMenu);
      } else {
        changeMenu(0, currentMenu, innerMenu);
      }
    }
  };

  render() {
    const { menuForward, currentMenu } = this.props;
    return (
      <section id="controls">
        <div id="wheel">
          <span
            id="menu-button"
            className="buttons"
            style={{ top: 20 }}
          >
            Menu
          </span>
          <img
            className="buttons"
            draggable="false"
            src={leftArrow}
            alt="left"
            style={{ left: 13, width: 40 }}
          ></img>
          <img
            className="buttons"
            draggable="false"
            src={rightArrow}
            alt="right"
            style={{ right: 13, width: 40 }}
          ></img>
          <img
            className="buttons"
            draggable="false"
            src={bottomArrow}
            alt="bottom"
            style={{ bottom: 13, width: 30, height: 37 }}
          ></img>
          <div id="ok-button" onClick={() => {
                menuForward(currentMenu);
              }}>
            <b>OK</b>
          </div>
        </div>
      </section>
    );
  }

  componentDidMount() {
    const { menuBackward, togglePlayPause } = this.props;
    const wheel = document.getElementById("wheel");
    const controlWheel = this.controlWheel;
    const activeRegion = ZingTouch.Region(wheel);
    const menuIcon = document.getElementById("menu-button");

    activeRegion.bind(menuIcon, "tap", function (e) {
      menuBackward();
    });
    activeRegion.bind(wheel, "rotate", function (e) {
      controlWheel(e);
    });
  }
}

export default Controls;
