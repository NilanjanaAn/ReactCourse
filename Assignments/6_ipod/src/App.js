import React from "react";
import "./App.css";
import Screen from "./components/Screen";
import Wheel from "./components/Wheel";
import Controls from "./components/Controls";

class App extends React.Component {
  // Handle the rotate event fired from the control component

  // If ok button is clicked,  open the selected component

  // If menu button is clicked, go back to the menu screen
  constructor() {
    super();
    this.state = {
      active: 0,
      menu: ["Coverflow", "Music", "Games", "Settings"],
      musicMenu: ["All Songs", "Artists", "Albums"],
      showing: false,
      innerMenu: false,
      playing: false,
      audio: null,
      currentInnerMenu: 0,
    };
  }

  changeMenu = (clockwise, element, musicMenu) => {
    if (this.state.showing) return;
    if (!musicMenu) {
      if (element !== 0 && element !== 1 && element !== 2 && element !== 3) {
        return;
      }
      let min = 0;
      let max = 3;

      if (clockwise === 1) {
        if (this.state.active >= max) {
          this.setState({ active: min });
        } else {
          this.setState({ active: this.state.active + 1 });
        }
      } else {
        if (this.state.active <= min) {
          this.setState({ active: max });
        } else {
          this.setState({ active: this.state.active - 1 });
        }
      }
    } else {
      if (element !== 0 && element !== 1 && element !== 2) {
        return;
      }
      let min = 0;
      let max = 2;

      if (clockwise === 1) {
        if (this.state.currentInnerMenu >= max) {
          this.setState({ currentInnerMenu: min });
        } else {
          this.setState({ currentInnerMenu: this.state.currentInnerMenu + 1 });
        }
      } else {
        if (this.state.currentInnerMenu <= min) {
          this.setState({ currentInnerMenu: max });
        } else {
          this.setState({ currentInnerMenu: this.state.currentInnerMenu - 1 });
        }
      }
    }
  };

  menuBackward = () => {
    if (this.state.showing) this.setState(() => ({ showing: false }));
    else if (this.state.innerMenu) this.setState(() => ({ innerMenu: false }));
  };

  menuForward = (element) => {
    if (element === 1 && !this.state.innerMenu) {
      this.setState(() => ({ innerMenu: true }));
    } else this.setState(() => ({ showing: true }));
  };

  togglePlayPause = () => {
    if (!this.state.showing || this.state.audio === null) {
      return;
    }
    if (this.state.playing === true) {
      this.setState({ playing: false });
      this.state.audio.pause();
      console.log("pause");
    } else {
      this.setState({ playing: true });
      this.state.audio.play();
      console.log("play");
    }
  };

  startPlay = () => {
    console.log(this.state.audio);
    if (!this.state.showing || this.state.audio === null) {
      return;
    }
    this.state.audio.play();
    console.log("played");
  };

  setAudio = (audio) => {
    this.setState(() => ({ audio }));
    this.startPlay();
  };

  render() {
    const { active, showing, innerMenu, currentInnerMenu } = this.state;
    return (
      <>
        <div className="iPod-app">
          <Screen
            currentMenu={active}
            showing={showing}
            innerMenu={innerMenu}
            setAudio={this.setAudio}
            togglePlayPause={this.togglePlayPause}
            startPlay={this.startPlay}
            currentInnerMenu={currentInnerMenu}
          />
          {/* <Wheel
            currentMenu={active}
            innerMenu={innerMenu}
            changeMenu={this.changeMenu}
            menuForward={this.menuForward}
            menuBackward={this.menuBackward}
            togglePlayPause={this.togglePlayPause}
            currentInnerMenu={currentInnerMenu}
          /> */}
          <Controls
          currentMenu={active}
          innerMenu={innerMenu}
          changeMenu={this.changeMenu}
          menuForward={this.menuForward}
          menuBackward={this.menuBackward}
          togglePlayPause={this.togglePlayPause}
          currentInnerMenu={currentInnerMenu}/>
        </div>
      </>
    );
  }
}

export default App;
