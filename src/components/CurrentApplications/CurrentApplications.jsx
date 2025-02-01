import React, { useEffect, useState } from "react";
import "./CurrentApplications.css";
import { motion } from "framer-motion";
import { FaAppStore, FaServer, FaCode, FaBox } from "react-icons/fa";

const tabs = [
  "All",
  "Applications",
  "Services",
  "Programming Languages",
  "Other",
];
const ITEMS_PER_PAGE = 5;

const CurrentApplications = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [installedApt, setInstalledApt] = useState([]);
  const [filteredApt, setFilteredApt] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (window.electronAPI) {
      const fetchInfo = async () => {
        const aptInstalled = await window.electronAPI.runCommand(
          "getAptInstalled"
        );

        // Convert string to array (split by new lines & remove empty entries)
        const aptArray = aptInstalled
          ? aptInstalled.split("\n").filter(Boolean)
          : [];
        setInstalledApt(aptArray);
        setFilteredApt(aptArray); // Default filtered data
      };

      fetchInfo();
    }
  }, []);

  // Function to categorize applications
  const categorizeApp = (app) => {
    if (app.includes("lib") || app.includes("dev") || app.includes("runtime"))
      return "Programming Languages";
    if (app.includes("service") || app.includes("daemon")) return "Services";
    if (app.includes("app") || app.includes("software") || app.includes("gui"))
      return "Applications";
    return "Other";
  };

  // Filtering logic based on selected tab and search query
  useEffect(() => {
    let filtered = installedApt;

    if (activeTab !== "All") {
      filtered = filtered.filter((app) => categorizeApp(app) === activeTab);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter((app) =>
        app.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredApt(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [activeTab, searchQuery, installedApt]);

  // Pagination logic
  const totalPages = Math.ceil(filteredApt.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredApt.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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

  return (
    <motion.div className="CurrentApplications">
      {/* Tabs Section with Search Bar */}
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
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="content current-content">
        <div className="current-app-grid">
          {paginatedItems.map((app, index) => (
            <div key={index} className="app-card current-app-card">
              <div className="app-icon">
                {getIconForCategory(categorizeApp(app))}
              </div>

              <p>{app}</p>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ◀ Prev
            </button>
            <span>
              Page{" "}
              <input
                type="number"
                style={{ width: "40px", textAlign: "right" }}
                value={currentPage}
                onChange={(e) => {
                  const pageNumber = Math.max(
                    1,
                    Math.min(totalPages, parseInt(e.target.value, 10) || 1)
                  );
                  setCurrentPage(pageNumber);
                }}
              />{" "}
              of
              {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next ▶
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CurrentApplications;
