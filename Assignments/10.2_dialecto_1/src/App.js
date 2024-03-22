import "./styles.css";
import { useState } from "react";
import { Navbar } from "./Navbar";
import { Home } from "./Home";
import { languageContext } from "./languageContext";
import { themeContext } from "./themeContext";

// get theme and language contexts here

export default function App() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("English");

  return (
    <div className={`App ${theme}`}>
      {/* Add context provider here */}
      <languageContext.Provider value={{ language, setLanguage }}>
        <themeContext.Provider value={{ theme, setTheme }}>
          <Navbar />
        </themeContext.Provider>
        <Home />
      </languageContext.Provider>
    </div>
  );
}
