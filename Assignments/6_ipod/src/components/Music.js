import MusicMenu from './MusicMenu';
import AllSongs from './AllSongs';
import Artists from './Artists';
import Albums from './Albums';


function Music(props) {
  const {innerMenu, currentInnerMenu, showing} = props;
    return (
      <div className="display">
            {!showing && innerMenu && (
              <MusicMenu currentInnerMenu={currentInnerMenu} />
            )}
            {innerMenu &&
              showing &&
              currentInnerMenu === 0 && <AllSongs />}
            {innerMenu &&
              showing &&
              currentInnerMenu === 1 && <Artists />}
            {innerMenu &&
              showing &&
              currentInnerMenu === 2 && <Albums />}
          </div>
    );
  }
  
  export default Music;
  