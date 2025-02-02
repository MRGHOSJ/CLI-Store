import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./InstalledApplicationInfo.css";
import { FaAppStore, FaServer, FaCode, FaBox } from "react-icons/fa";
import InstalledApplicationsDetails from "../../components/InstalledApplicationsDetails/InstalledApplicationsDetails";

const getIconForCategory = (category) => {
  switch (category) {
    case "Applications":
      return <FaAppStore />;
    case "Services":
      return <FaServer />;
    case "Programming Languages":
      return <FaCode />;
    default:
      return <FaBox />;
  }
};

// Function to categorize applications
const categorizeApp = (app) => {
  if (app.includes("lib") || app.includes("dev") || app.includes("runtime"))
    return "Programming Languages";
  if (app.includes("service") || app.includes("daemon")) return "Services";
  if (app.includes("app") || app.includes("software") || app.includes("gui"))
    return "Applications";
  return "Other";
};

const InstalledApplicationInfo = () => {
  const location = useLocation();
  const applicationName = location.pathname.replace("/Environments/", "");
  const [status, setStatus] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    fetchAptDetails(applicationName);
    fetchAptStatus(applicationName);
  });

  const fetchAptDetails = async (packageName) => {
    if (!packageName) {
      console.error("Package name is required.");
      return;
    }

    try {
      const packageDetails = await window.electronAPI.runCmd(
        "apt show",
        packageName
      );
      console.log(packageDetails); // For debugging
      setDetails(packageDetails);
    } catch (error) {
      console.error("Error fetching package details:", error);
      return "Package details could not be retrieved.";
    }
  };

  const fetchAptStatus = async (packageName) => {
    if (!packageName) {
      console.error("Package name is required.");
      return;
    }

    try {
      const packageStatus = await window.electronAPI.runCmd(
        "systemctl status",
        packageName
      );
      console.log(packageStatus);
      setStatus(packageStatus);
    } catch (error) {
      console.error("Error fetching package details:", error);
      return "Package details could not be retrieved.";
    }
  };

  const friends = [
    {
      name: "MasterGreatAxe",
      lastPlayed: "A few minutes ago",
      progress: "280/5210",
      hours: "36.2h",
    },
    {
      name: "LastRoar",
      lastPlayed: "18m ago",
      progress: "1635/5210",
      hours: "186.8h",
    },
    {
      name: "ShiekShark",
      lastPlayed: "27m ago",
      progress: "1205/5210",
      hours: "236.2h",
    },
    {
      name: "ThunderGrizzly",
      lastPlayed: "2d ago",
      progress: "2318/5210",
      hours: "1202.2h",
    },
  ];

  return (
    <div className="InstalledApplicationInfo">
      {/* Game Header */}
      <div className="game-header">
        <div style={{ display: "flex" }}>
          <span style={{ paddingRight: "40px", fontSize: "100px" }}>
            {getIconForCategory(categorizeApp(applicationName))}
          </span>
          <div>
            {/* 0.0.4 • Public • Published 10 years ago */}
            <h1 className="game-title">{applicationName}</h1>
            <p className="game-details">
              Version: 0.0.4 | Published: 10 years ago
            </p>
          </div>
        </div>
        <div>
          <button className="play-button installed" disabled>
            Installed
          </button>
          <button className="more-info">More Info</button>
        </div>
      </div>

      <InstalledApplicationsDetails
        applicationName={applicationName}
        details={details}
        status={status}
      />
    </div>
  );
};

export default InstalledApplicationInfo;
