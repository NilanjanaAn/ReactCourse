import React, { useEffect } from "react";

function SideMenu(props) {
  // write logic for changing the selected item in the side menu
  const { currentMenu } = props;
  return (
    <table id="side-menu">
      <tbody>
        <tr>
          <th className="table-heading">
            iPod <i className="fas fa-home"></i>
          </th>
        </tr>
        <tr data-option="coverflow">
          <td className={currentMenu===0?"table-item active":"table-item"}>
            Coverflow<i className="fas fa-chevron-right"></i>
          </td>
        </tr>
        <tr data-option="music">
          <td className={currentMenu===1?"table-item active":"table-item"}>
            Music<i className="fas fa-chevron-right"></i>
          </td>
        </tr>
        <tr data-option="games">
          <td className={currentMenu===2?"table-item active":"table-item"}>
            Games<i className="fas fa-chevron-right"></i>
          </td>
        </tr>
        <tr data-option="settings">
          <td className={currentMenu===3?"table-item active":"table-item"}>
            Settings<i className="fas fa-chevron-right"></i>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default SideMenu;
