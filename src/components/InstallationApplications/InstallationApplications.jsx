import React, { useState } from "react";
import "./InstallationApplications.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Change from useHistory to useNavigate

const tabs = ["All", "Applications", "Services", "Programming Languages"];
const applications = [
  {
    name: "Visual Studio Code",
    category: "Applications",
    icon: "🖥️",
    path: "/Installations/vscode",
  },
  { name: "Docker", category: "Services", icon: "🐳", path: "/Installations/docker" },
  {
    name: "Node.js",
    category: "Programming Languages",
    icon: "🟢",
    path: "/Installations/node.js",
  },
  {
    name: "Python",
    category: "Programming Languages",
    icon: "🐍",
    path: "/Installations/python",
  },
  { name: "Git", category: "Services", icon: "🔴", path: "/Installations/git" },
  { name: "Gitb", category: "Services", icon: "🔴", path: "/Installations/Docker" },
  { name: "Gitd", category: "Services", icon: "🔴", path: "/Installations/docker" },
  { name: "Gitt", category: "Services", icon: "🔴", path: "/Installations/docker" },
  { name: "Gitza", category: "Services", icon: "🔴", path: "/Installations/docker" },
  { name: "Gitaza", category: "Services", icon: "🔴", path: "/Installations/docker" },
  { name: "Giteza", category: "Services", icon: "🔴", path: "/Installations/docker" },
  { name: "Gitazfza", category: "Services", icon: "🔴", path: "/Installations/docker" },
  { name: "azfafaz", category: "Services", icon: "🔴", path: "/Installations/docker" },
  { name: "Gitazfaeza", category: "Services", icon: "🔴", path: "/Installations/docker" },
  { name: "Gitazazfafza", category: "Services", icon: "🔴", path: "/Installations/docker" },
  { name: "Giazftaza", category: "Services", icon: "🔴", path: "/Installations/docker" },
  { name: "Giazfteza", category: "Services", icon: "🔴", path: "/Installations/docker" },
  { name: "Giafatazfza", category: "Services", icon: "🔴", path: "/Installations/docker" },
];

// Remove duplicates dynamically
const uniqueApps = Array.from(
  new Set(applications.map((app) => JSON.stringify(app)))
).map((str) => JSON.parse(str));

const InstallationApplications = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const navigate = useNavigate(); // Using useNavigate instead of history.push

  // Filter & Sort Applications
  const filteredApps = uniqueApps
    .filter((app) => activeTab === "All" || app.category === activeTab)
    .filter((app) => app.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  return (
    <motion.div className="InstallationApplications">
      <div className="content-card">
        {/* Tabs Section */}
        <div className="tabsInstallation">
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

        {/* Search & Sort Section */}
        <div className="search-sort">
          <input
            type="text"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="sort-dropdown"
          >
            <option value="asc">Sort A-Z</option>
            <option value="desc">Sort Z-A</option>
          </select>
        </div>

        {/* Applications Grid */}
        <div className="app-grid">
          {filteredApps.map((app, index) => (
            <div
              key={index}
              className="app-card"
              onClick={() => {
                navigate(app.path); // Navigate to the selected route
              }}
            >
              <span className="app-icon">{app.icon}</span>
              <p>{app.name}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default InstallationApplications;
