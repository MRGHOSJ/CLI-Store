import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import Logo from "../imgs/logo.png";
import { UilCommentQuestion } from "@iconscout/react-unicons"; // Import the moon icon
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom"; // Change from useHistory to useNavigate

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpaned] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate(); // Using useNavigate instead of history.push
  const location = useLocation(); // Get current location

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark mode to the body element
  useEffect(() => {
    if (darkMode) {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.removeAttribute("data-theme");
    }
  }, [darkMode]);

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };

  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpaned(!expanded)}
      >
        <UilBars />
      </div>

      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        {/* logo */}
        <div className="logo">
          <img src={Logo} alt="logo" />
          <span>
            Sh<span>o</span>ps
          </span>
        </div>

        <div className="menu">
          {SidebarData.map((item, index) => {
            const isActive =
              location.pathname === "/"
                ? location.pathname === "/" + item.path
                : location.pathname.indexOf(item.path.replace("/", "")) > 0;

            return (
              <div
                className={isActive ? "menuItem active" : "menuItem"}
                key={index}
                onClick={() => {
                  setSelected(index);
                  navigate(item.path); // Navigate to the selected route
                }}
              >
                <item.icon />
                <span style={{ fontWeight: "bold" }}>{item.heading}</span>
              </div>
            );
          })}

          {/* Dark Mode Toggle */}

          {/* <div className="menuItem" onClick={toggleDarkMode}>
            <UilMoon />
            <span style={{ fontWeight: "bold" }}>Dark Mode</span>
          </div> */}

        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
