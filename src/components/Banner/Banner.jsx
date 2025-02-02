import React, { useState, useEffect } from "react";
import "./Banner.css";
import {
  UilDocumentInfo,
  UilWifi,
  UilWifiSlash,
} from "@iconscout/react-unicons";
import SystemInfoModal from "./SystemInfoModal/SystemInfoModal";

const Banner = ({ systemInfo, isConnected, networkName, networkInfo }) => {
  const [gifPlayed, setGifPlayed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

  const backgroundImage =
    "https://media1.giphy.com/media/3joYfsxjITUvP00atl/200.gif?cid=6c09b952r63jx4estj6429d5w1558pw6js0mvnoxo1ybino3&ep=v1_gifs_search&rid=200.gif";
  // This will be the static image (the last frame of your GIF)
  const staticImage = "https://i.imgur.com/1JGBrma.gif"; // Replace with the URL of the last frame

  // Duration of the GIF in milliseconds (this should match the GIF duration)
  const gifDuration = 4000; // 4 seconds, adjust as needed based on your GIF duration

  useEffect(() => {
    // Set a timeout to change the image after the GIF duration ends
    const timeout = setTimeout(() => {
      setGifPlayed(true);
    }, gifDuration);

    return () => clearTimeout(timeout); // Clean up the timeout on component unmount
  }, [gifDuration]);

  // Function to open network settings (Ubuntu)
  const openNetworkSettings = async () => {
    if (window.electronAPI) {
      // Open network settings on Ubuntu if not connected
      await window.electronAPI.runCommand("openNetworkSettings");
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); // Hide the modal
  };

  const handleSystemInfoClick = () => {
    setIsModalVisible(true); // Show the modal
  };

  return (
    <div className="banner">
      <div className="banner-content">
        <div style={{ display: "flex" }}>
          <img
            src={"https://cdn.simpleicons.org/" + systemInfo.os}
            style={{ paddingRight: "40px" }}
            width={100}
          />
          <div>
            <h2>
              {systemInfo.os} -{" "}
              {systemInfo.isVirtual ? "Virtual Machine" : "Physical Machine"}
            </h2>
            <div style={{ display: "flex" }}>
              <span style={{ width: "160px" }}>
                Version: {systemInfo.version}{" "}
              </span>
            </div>
          </div>
        </div>

        <div className="status-buttons">
          {/* Network Button */}
          <button
            className="status-btn"
            onClick={() => {
              openNetworkSettings();
            }}
          >
            {isConnected ? (
              <UilWifi className="icon" />
            ) : (
              <UilWifiSlash className="icon" />
            )}

            <div className="text">
              <span className="label">Network</span>
              <span className="status">
                {isConnected ? networkName : "Not Connected"}
              </span>
            </div>
          </button>

          {/* System Info Button */}
          <button className="status-btn" onClick={handleSystemInfoClick}>
            <UilDocumentInfo className="icon" />
            <span className="text">System Information</span>
          </button>
        </div>
      </div>

      {/* Show the GIF initially */}
      <img
        className="banner-image"
        src={gifPlayed ? staticImage : backgroundImage}
        alt="background"
      />

      {/* Modal */}
      <SystemInfoModal
        systemInfo={systemInfo}
        open={isModalVisible}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Banner;
