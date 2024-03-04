import React from "react";
import "./App.css";
import Screen from "./components/Screen";
import Wheel from "./components/Wheel";

class App extends React.Component {
  // Handle the rotate event fired from the control component

  // If ok button is clicked,  open the selected component

  // If menu button is clicked, go back to the menu screen
  constructor() {
    super();
    this.state = {
      active: 0,
      menu: ["Coverflow", "Music", "Games", "Settings"],
      showing: false,
      playing: false,
      audio: null
    };
  }

  changeMenu = (clockwise, menu) => {
    if(this.state.showing)
      return;
    if (menu !== 0 && menu !== 1 && menu !== 2 && menu !== 3) {
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
  };

  menuBackward = () => {
    this.setState(()=>({showing:false}))
  };

  menuForward = (id) => {
    this.setState(()=>({showing:true}))
  };

  togglePlayPause = () => {
    if (!this.state.showing || this.state.audio===null) {
      return;
    }
    if (this.state.playing === true) {
      this.setState({ playing: false });
      this.state.audio.pause();
      console.log("pause");
    }
    else {
      this.setState({ playing: true });
      this.state.audio.play();
      console.log("play");
    }
  }

  startPlay = () => {
    console.log(this.state.audio);
    if (!this.state.showing || this.state.audio===null) {
      return;
    }
    this.state.audio.play();
    console.log("played");
  }

  setAudio=(audio)=>{
    this.setState(()=>({audio}));
    console.log("set");
    this.startPlay();
  }

  render() {
    const { active, showing } = this.state;
    return (
      <>
        <div className="iPod-app">
          <Screen currentMenu={active} showing={showing} setAudio={this.setAudio} togglePlayPause={this.togglePlayPause} startPlay={this.startPlay}/>
          <Wheel
            currentMenu={active}
            changeMenu={this.changeMenu}
            menuForward={this.menuForward}
            menuBackward={this.menuBackward}
            togglePlayPause={this.togglePlayPause}
          />
        </div>
      </>
    );
  }
}

export default App;
