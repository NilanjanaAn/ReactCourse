import React from "react";
import "./css/screen.css";
import SideMenu from "./SideMenu";
import Navbar from "./Navbar";
import Coverflow from "./Coverflow";
import Song from "./Song";
import Games from "./Games";
import Settings from "./Settings";
import sound from './songs/TroyBoiAfterhours.mp3';
import MusicMenu from "./MusicMenu";

class Screen extends React.Component {
  // Display the sidemenu, coverflow, games,Music etc here
  render() {
    const {currentMenu, showing, setAudio, togglePlayPause, startPlay, innerMenu, currentInnerMenu}=this.props;
    return (
      <>
        <div className="screen" id="screen">
          <Navbar/>
          {!innerMenu && !showing && <SideMenu currentMenu={currentMenu}/>}
          {!showing && innerMenu && <MusicMenu currentInnerMenu={currentInnerMenu}/>}
          {currentMenu === 0 && showing && <Coverflow/>}
          {currentMenu === 1 && innerMenu && showing && <Song name="Afterhours" playing="true" audio={new Audio(sound)} url="https://i1.sndcdn.com/artworks-000141095094-r9gkfw-t500x500.jpg" setAudio={setAudio} togglePlayPause={togglePlayPause} startPlay={startPlay}/>}
          {currentMenu === 2 && showing && <Games/>}
          {currentMenu === 3 && showing && <Settings/>}
        </div>
      </>
    );
  }
}

export default Screen;
