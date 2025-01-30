import React from "react";
import { useLocation } from "react-router-dom";
import "./ApplicationInfo.css";
import ApplicationsDetails from "../../components/ApplicationsDetails/ApplicationsDetails";

const ApplicationInfo = () => {
  const location = useLocation();
  const applicationName = location.pathname.replace("/Installations/", "");

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
    <div className="ApplicationInfo">
      {/* Game Header */}
      <div className="game-header">
        <div style={{ display: "flex" }}>
          <img
            src={"https://cdn.simpleicons.org/" + applicationName}
            style={{ paddingRight: "40px" }}
            width={100}
          />
          <div>
          {/* 0.0.4 • Public • Published 10 years ago */}
            <h1 className="game-title">{applicationName}</h1>
            <p className="game-details">
              Version: 0.0.4 | Published: 10 years ago
            </p>
          </div>
        </div>
        <div>
          <button className="play-button">Install</button>
          <button className="more-info">More Info</button>
        </div>
      </div>

      <ApplicationsDetails/>

    </div>
  );
};

export default ApplicationInfo;
