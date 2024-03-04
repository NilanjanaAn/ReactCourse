import React from "react";
import "./css/screen.css";
import SideMenu from "./SideMenu";
import Navbar from "./Navbar";
import Coverflow from "./Coverflow";
import Song from "./Song";
import Games from "./Games";
import Settings from "./Settings";
import sound from './songs/TroyBoiAfterhours.mp3';

class Screen extends React.Component {
  // Display the sidemenu, coverflow, games,Music etc here
  render() {
    const {currentMenu, showing, setAudio, togglePlayPause, startPlay}=this.props;
    return (
      <>
        <div className="screen" id="screen">
          <Navbar/>
          {showing===false && <SideMenu currentMenu={currentMenu}/>}
          {currentMenu === 0 && showing && <Coverflow/>}
          {currentMenu === 1 && showing && <Song name="Afterhours" playing="true" audio={new Audio(sound)} url="https://i1.sndcdn.com/artworks-000141095094-r9gkfw-t500x500.jpg" setAudio={setAudio} togglePlayPause={togglePlayPause} startPlay={startPlay}/>}
          {currentMenu === 2 && showing && <Games/>}
          {currentMenu === 3 && showing && <Settings/>}
        </div>
      </>
    );
  }
}

export default Screen;
