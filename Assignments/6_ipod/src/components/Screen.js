import React from "react";
import "./css/screen.css";
import SideMenu from "./SideMenu";
import Navbar from "./Navbar";
import Coverflow from "./Coverflow";
import Games from "./Games";
import Settings from "./Settings";
import Music from "./Music";

class Screen extends React.Component {
  // Display the sidemenu, coverflow, games,Music etc here
  render() {
    const {
      currentMenu,
      showing,
      setAudio,
      togglePlayPause,
      startPlay,
      innerMenu,
      currentInnerMenu,
    } = this.props;
    return (
      <>
        <div className="screen" id="screen">
          <Navbar />
          {!innerMenu && !showing && <SideMenu currentMenu={currentMenu} />}
          {currentMenu === 0 && showing && <Coverflow />}
          {currentMenu === 1 && (showing || innerMenu) && <Music showing={showing} innerMenu={innerMenu} currentInnerMenu={currentInnerMenu}/>}
          {currentMenu === 2 && showing && <Games />}
          {currentMenu === 3 && showing && <Settings />}
        </div>
      </>
    );
  }
}

export default Screen;
