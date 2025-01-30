import React, { useState, useEffect } from "react";
import "./Settings.css";

const Settings = () => {
  // Check for saved theme preference
  const storedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(storedTheme);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Save preference
  };

  // Apply theme to the body
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="Settings">
      <h1>Settings</h1>
      <div className="toggle-container">
        <span>🌞 Light Mode</span>
        <label className="switch">
          <input type="checkbox" checked={theme === "dark"} onChange={toggleTheme} />
          <span className="slider round"></span>
        </label>
        <span>🌙 Dark Mode</span>
      </div>
    </div>
  );
};

export default Settings;
