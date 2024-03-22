import { useContext } from "react";
import { languageContext } from "./languageContext";
import { themeContext } from "./themeContext";

export const Navbar = () => {
  // get theme and lanauge contexts here
  const { language } = useContext(languageContext);
  const { setTheme } = useContext(themeContext);
  const toggleTheme = (e) => {
    e.preventDefault();
    setTheme((prev) => {
      if (prev === "light") return "dark";
      return "light";
    });
  };
  return (
    <div className="navbar">
      <span>Dialecto</span>
      <div className="right">
        {/* add eventListerner to it also change the content of the button based on the theme */}
        <button
          onClick={(e) => {
            toggleTheme(e);
          }}
        >
          dark theme
        </button>
        <span>
          {/* Show active language here */}
          {language}
        </span>
      </div>
    </div>
  );
};
