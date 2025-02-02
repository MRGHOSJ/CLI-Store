import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  FaDesktop,
  FaMemory,
  FaMicrochip,
  FaCogs,
  FaNetworkWired,
} from "react-icons/fa";
import { MdInfo } from "react-icons/md";
import "./SystemInfoModal.css";

const SystemInfoModal = ({ systemInfo, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: 24,
          width: "400px",
        }}
      >
        <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
          <MdInfo style={{ marginRight: "8px" }} fontSize="20px" />
          System Information
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <FaDesktop />
            </ListItemIcon>
            <ListItemText primary={`OS: ${systemInfo.os}`} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <MdInfo />
            </ListItemIcon>
            <ListItemText primary={`Version: ${systemInfo.version}`} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <MdInfo />
            </ListItemIcon>
            <ListItemText primary={`Kernel: ${systemInfo.kernel}`} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FaMicrochip />
            </ListItemIcon>
            <ListItemText primary={`CPU: ${systemInfo.cpu}`} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FaMemory />
            </ListItemIcon>
            <ListItemText primary={`Memory: ${systemInfo.memory}`} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FaCogs />
            </ListItemIcon>
            <ListItemText
              primary={`Virtual Machine: ${
                systemInfo.isVirtual ? "Yes" : "No"
              }`}
            />
          </ListItem>
        </List>
        <center>
          <Button
            className="status-btn close-btn"
            onClick={onClose}
            sx={{ marginTop: 2 }}
          >
            Close
          </Button>
        </center>
      </Box>
    </Modal>
  );
};

export default SystemInfoModal;
