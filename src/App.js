import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainDash from "./pages/MainDash/MainDash";
import Installations from "./pages/Installations/Installations";
import Settings from "./pages/Settings/Settings";
import Environments from "./pages/Environments/Environments";
import RightSide from "./components/RigtSide/RightSide";
import "./App.css";
import NotFound from "./pages/NotFound/NotFound";
import ApplicationInfo from "./pages/ApplicationInfo/ApplicationInfo";
import Help from "./pages/Help/Help";

function App() {

  return (
    <Router>
      <div className="App">
        <div className="AppGlass">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<MainDash />} />
              <Route path="/Installations" element={<Installations />} />
              <Route path="/Installations/*" element={<ApplicationInfo />} />
              <Route path="/Settings" element={<Settings />} />
              <Route path="/Environments" element={<Environments />} />
              <Route path="/Help" element={<Help />} />
              <Route path="/notfound" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/notfound" replace />} />
            </Routes>
          </div>
          {/* <RightSide /> */}
        </div>
      </div>
    </Router>
  );
}

export default App;
