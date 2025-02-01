import React, { useEffect, useState } from "react";
import "./Environments.css";
import Banner from "../../components/Banner/Banner";
import CurrentApplications from "../../components/CurrentApplications/CurrentApplications";

const Environments = () => {
  const [systemInfo, setSystemInfo] = useState({
    os: "Unknown",
    version: "N/A",
    kernel: "N/A",
    cpu: "N/A",
    memory: "N/A",
    isVirtual: "Unknown",
  });

  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    if (window.electronAPI) {
      const fetchInfo = async () => {
        const osDescription = await window.electronAPI.runCommand(
          "getLinuxVersion"
        );
        const kernelVersion = await window.electronAPI.runCommand(
          "getKernelVersion"
        );
        const cpuInfo = await window.electronAPI.runCommand("getCpuInfo");
        const memoryInfo = await window.electronAPI.runCommand("getMemory");
        const currentUser = await window.electronAPI.runCommand(
          "getCurrentUser"
        );
        const virtualMachine = await window.electronAPI.runCommand(
          "checkVirtualization"
        );

        setCurrentUser(currentUser);
        // Extract OS name and version
        let os = "Unknown";
        let version = "N/A";

        if (osDescription.includes("Ubuntu")) {
          os = "Ubuntu";
          version = osDescription
            .replace("Description:", "")
            .trim()
            .replace("Ubuntu", "")
            .trim();
        }

        setSystemInfo({
          os,
          version,
          kernel: kernelVersion,
          cpu: cpuInfo,
          memory: memoryInfo,
          isVirtual: virtualMachine === "none" ? false : true,
        });
      };

      fetchInfo();
    }
  }, []);

  return (
    <div className="Environments">
      <h1>Environments ({currentUser})</h1>
      <Banner
        os={systemInfo.os}
        version={systemInfo.version}
        isVirtual={systemInfo.isVirtual}
        isConnected={true}
        networkName="Home Wi-Fi"
      />
      <CurrentApplications />
    </div>
  );
};

export default Environments;
