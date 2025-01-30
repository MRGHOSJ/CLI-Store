import React, { useState } from "react";
import "./CurrentApplications.css";
import { motion } from "framer-motion";

const tabs = ["All", "Applications", "Services", "Programming languages"];

const CurrentApplications = () => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <motion.div className="CurrentApplications">
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

export default CurrentApplications;
