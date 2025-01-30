import React from "react";
import "./Environments.css";
import Banner from "../../components/Banner/Banner";
import CurrentApplications from "../../components/CurrentApplications/CurrentApplications";
const Environments = () => {
  return (
    <div className="Environments">
      <h1>Environments</h1>
      <Banner os="Windows 11" version="22H2" isVirtual={true} isConnected={true} networkName="Home Wi-Fi" />
      <CurrentApplications/>
    </div>
  );
};

export default Environments;
