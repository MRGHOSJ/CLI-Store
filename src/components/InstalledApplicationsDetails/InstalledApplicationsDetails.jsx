import React, { useState } from "react";
import "./InstalledApplicationsDetails.css";
import { motion } from "framer-motion";
import Terminal from "react-terminal-ui";

const InstalledApplicationsDetails = ({
  applicationName = "",
  details = "",
  status = "",
}) => {
  const [activeTab, setActiveTab] = useState("Readme");
  const tabs = ["Readme", "Dependencies", "Versions"];

  if (status != "") tabs.push("Status");

  return (
    <motion.div className="InstalledApplicationsDetails">
      {/* Tabs Section */}
      <div className="tabs">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Content Section */}
      <div className="content">
        {activeTab == "Readme" && (
          <div>
            <h1>Description</h1>
            <pre style={{ width: "5px !important" }}>{details}</pre>
          </div>
        )}
        {activeTab == "Dependencies" && <h1>Dependencies</h1>}
        {activeTab == "Versions" && <h1>Versions</h1>}
        {activeTab == "Status" && (
          <div>
            <h1>Service Status</h1>
            <Terminal name={applicationName + " Service Status"} height="100%">
              {status.split("\n").map((line, index) => {
                // Match "Active:" and capture the status part
                const activeMatch = line.match(/(Active: )([\w\s()]+)/);
                if (activeMatch) {
                  const isActive = activeMatch[2].includes("active (running)");
                  return (
                    <div key={index}>
                      <span>{activeMatch[1]}</span>
                      <span
                        style={{
                          color: isActive ? "#00ff00" : "red", // Exact green color
                          fontWeight: "bold",
                        }}
                      >
                        {activeMatch[2]}
                      </span>
                      <span>
                        {line
                          .replace(activeMatch[1], "")
                          .replace(activeMatch[2], "")}
                      </span>
                    </div>
                  );
                }
                return <div key={index}>{line}</div>;
              })}
            </Terminal>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default InstalledApplicationsDetails;
