import React, { useEffect, useState } from "react";
import "./InstallationApplications.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const tabs = ["Apt-get", "Snap", "Npm"];
const batchSize = 12;

const InstallationApplications = () => {
  const [activeTab, setActiveTab] = useState("Apt-get");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.electronAPI) {
      const fetchPackages = async () => {
        setLoading(true);
        setError("");
        try {
          const result = await window.electronAPI.getNonInstalledApt();
          setPackages(result);
        } catch (err) {
          setError("Error fetching package list.");
          console.error(err);
        }
        setLoading(false);
      };
      fetchPackages();
    }
  }, []);

  const filteredApps = packages
    .filter((app) => activeTab === "Apt-get" || app.category === activeTab)
    .filter(
      (app) =>
        app.toLowerCase() === searchTerm.toLowerCase() ||
        app.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.localeCompare(b) : b.localeCompare(a)
    );

  const totalPages = Math.ceil(filteredApps.length / batchSize);
  const currentApps = filteredApps.slice(
    (currentPage - 1) * batchSize,
    currentPage * batchSize
  );

  return (
    <motion.div className="InstallationApplications">
      <div className="content-card">
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

        <div className="search-sort">
          <input
            type="text"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar-init"
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
        {error && { error }}
        {loading ? (
          <img
            style={{ left: "45%", top: "45%" , position:"absolute"}}
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_632/04de2e31234507.564a1d23645bf.gif"
          />
        ) : (
          <div>
            <div className="app-grid">
              {currentApps.map((app, index) => (
                <div
                  key={index}
                  className="app-card current-app-card"
                  onClick={() => navigate(`/Installations/${app}`)}
                >
                  <span className="app-icon">📦</span>
                  <p>{app}</p>
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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
        )}
      </div>
    </motion.div>
  );
};

export default InstallationApplications;
