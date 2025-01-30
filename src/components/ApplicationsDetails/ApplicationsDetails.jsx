import React, { useState } from "react";
import "./ApplicationsDetails.css";
import { motion } from "framer-motion";

const tabs = ["Readme", "Dependencies", "Versions"];

const ApplicationsDetails = () => {
  const [activeTab, setActiveTab] = useState("Readme");

  return (
    <motion.div className="ApplicationsDetails">
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
        <h2>{activeTab} Applications</h2>
        <p>Display content based on the selected tab...</p>
      </div>
    </motion.div>
  );
};

export default ApplicationsDetails;
