import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3176/3176363.png"
          alt="logo"
          onClick={() => window.location.replace("/")}
        />

        <nav>
          {/* create nav links here */}
          <Link to="/">
            <h4>Home</h4>
          </Link>
          <Link to="/list">
            <h4>List</h4>
          </Link>
          <Link to="/contact">
            <h4>Contact</h4>
          </Link>
        </nav>
      </div>
    </div>
  );
};
