import React, { useEffect } from 'react';


function MusicMenu(props) {
    const { currentInnerMenu } = props;
    return (
      <table id="music-menu">
        <tbody>
        <tr>
            <th className="table-heading">Music <i className="fas fa-music"></i></th>
        </tr>
        <tr data-option="allSongs">
            <td className={currentInnerMenu===0?"table-item active":"table-item"}>All Songs<i className="fas fa-chevron-right"></i></td> 
        </tr>
        <tr data-option="artists">
            <td className={currentInnerMenu===1?"table-item active":"table-item"}>Artists<i className="fas fa-chevron-right"></i></td>
        </tr>
        <tr data-option="albums">
            <td className={currentInnerMenu===2?"table-item active":"table-item"}>Albums<i className="fas fa-chevron-right"></i></td>
        </tr>
        </tbody>
    </table>
    );
  }
  
  export default MusicMenu;
  