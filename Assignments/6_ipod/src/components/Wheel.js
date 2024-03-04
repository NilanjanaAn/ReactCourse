import React from "react";
import styles from "./css/wheel.module.css";
import ZingTouch from 'zingtouch';

class Wheel extends React.Component {
  constructor() {
    super();
    this.angle = 0;
  }

  controlWheel = (e) => {
    const { changeMenu, currentMenu } = this.props;
    if (e.detail.distanceFromOrigin === 0) {
      this.angle = e.detail.angle;
    }
    if (Math.abs(this.angle - e.detail.angle) > 300) {
      this.angle = Math.abs(e.detail.angle);
      if (e.detail.distanceFromLast === 0) {
        return;
      } else if (e.detail.distanceFromLast < 0) {
        changeMenu(1, currentMenu);
      } else {
        changeMenu(0, currentMenu);
      }
    } else if (Math.abs(this.angle - e.detail.angle) > 15) {
      this.angle = Math.abs(e.detail.angle);
      if (e.detail.distanceFromLast === 0) {
        return;
      } else if (e.detail.distanceFromLast > 0) {
        changeMenu(1, currentMenu);
      } else {
        changeMenu(0, currentMenu);
      }
    }
  };

  render() {
    let theme = "#9c9c9c";
    let caseColor = "#89d7eb";
    const { menuForward, currentMenu } = this.props;
    return (
      <>
        <div className="outerWheel" id={styles.outerWheel}>
          <div className={styles.wheel} id="wheel">
            <div className={styles.menuButton} id="menu-button">
              <div style={{ color: theme }}>MENU</div>
            </div>
            <div className="wheelButton" id={styles.forwardButton}>
              <i style={{ color: theme }} className="fas fa-fast-forward"></i>
            </div>
            <div className="wheelButton" id={styles.playPauseButton}>
              <div>
                <i style={{ color: theme }} className="fa fa-play"></i>{" "}
                <i style={{ color: theme }} className="fa fa-pause"></i>
              </div>
            </div>
            <div className="wheelButton" id={styles.reverseButton}>
              <i style={{ color: theme }} className="fa fa-fast-backward"></i>
            </div>
          </div>
          <div
            style={{ backgroundColor: caseColor }}
            className={styles.okButton}
            id="ok-button"
            onClick={() => {menuForward(currentMenu)}}
          ></div>
        </div>
      </>
    );
  }

  componentDidMount() {
    const { menuBackward, togglePlayPause } = this.props;
    const wheel = document.getElementById("wheel");
    const controlWheel = this.controlWheel;
    const activeRegion = ZingTouch.Region(wheel);
    const menuIcon = document.getElementById("menu-button");
    const playPause = document.getElementById(styles.playPauseButton);

    activeRegion.bind(menuIcon, "tap", function (e) {
      menuBackward();
    });
    activeRegion.bind(wheel, "rotate", function (e) {
      controlWheel(e);
    });
    activeRegion.bind(playPause, 'tap', function (e) {
      togglePlayPause();
  });
  }
}

export default Wheel;
