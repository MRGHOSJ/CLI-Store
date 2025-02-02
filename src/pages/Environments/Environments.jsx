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

  const [networkInfo, setNetworkInfo] = useState({
    isConnected: false,
    ipv4: "N/A",
    ipv6: "N/A",
    ssid: "N/A",
    adapter: "N/A",
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
        const AptCategories = await window.electronAPI.runCommand(
          "getAptCategories"
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

        const networkDetails = await window.electronAPI.runCommand("ipA");

        checkWifiConnection(networkDetails);
      };

      fetchInfo();
    }
  }, []);

  const checkWifiConnection = (networkDetails) => {
    // Parsing the output from `ip a`
    let ipv4 = "N/A";
    let ipv6 = "N/A";
    let ssid = "N/A";
    let adapter = "N/A";
    let isConnected = false;

    networkDetails.split("\n").forEach((line) => {
      // Detect interface names
      if (line.includes(":") && !line.includes("lo")) {
        const interfaceName = line.split(":")[1].trim();
        adapter = interfaceName;
      }

      // Find IPv4 address
      if (line.includes("inet ") && !line.includes("inet6")) {
        ipv4 = line.split("inet")[1].trim().split(" ")[0];
      }

      // Find IPv6 address
      if (line.includes("inet6")) {
        ipv6 = line.split("inet6")[1].trim().split(" ")[0];
      }

      // Detect Wi-Fi (SSID) if it is a Wi-Fi adapter
      if (line.includes("wlan")) {
        ssid = line.includes("ssid") ? line.split("ssid")[1].trim() : "N/A";
      }

      // Check for connection status
      if (line.includes("state UP")) {
        isConnected = true;
      }
    });

    if (ipv4.includes(127)) isConnected = false;

    setNetworkInfo({
      isConnected,
      ipv4,
      ipv6,
      ssid,
      adapter,
    });
  };

  return (
    <div className="Environments">
      <h1>Environments ({currentUser})</h1>
      <Banner
        systemInfo={systemInfo}
        isConnected={networkInfo.isConnected}
        networkName={networkInfo.ipv4 || "No Network"}
        networkInfo={networkInfo}
      />
      <CurrentApplications />
    </div>
  );
};

export default Environments;
