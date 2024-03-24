import { Link, Outlet, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="nav">
        {/* <Link to="/">
          <h4>HOME</h4>
        </Link>
        <Link to="/about">
          <h4>ABOUT</h4>
        </Link>
        <Link to="/items">
          <h4>ITEMS</h4>
        </Link> */}
        <NavLink
          to="/"
          className={({isActive}) => (isActive ? "activeLink" : "inactiveLink")}
        >
          <h4>HOME</h4>
        </NavLink>
        <NavLink
          to="/about"
          className={({isActive}) => (isActive ? "activeLink" : "inactiveLink")}
        >
          <h4>ABOUT</h4>
        </NavLink>
        <NavLink
          to="/items"
          className={({isActive}) => (isActive ? "activeLink" : "inactiveLink")}
        >
          <h4>ITEMS</h4>
        </NavLink>
      </div>
      <Outlet />{" "}
      {/* displays the children routes' components inside this component */}
    </>
  );
}

export default Navbar;
