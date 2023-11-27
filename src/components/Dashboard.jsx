import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import Banner from "./Banner.jsx";
import WebFooter from "./WebFooter.jsx";
import PortalCenter from "./dashboard components/PortalCenter.jsx";

function Dashboard() {
  const navigate = useNavigate();
  const { role, user } = useAuth();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  const PortalCenterDiv = {
    display: "flex",
    flexDirection: "column",
    paddingTop: "2rem",
    paddingBottom: "14rem",
    background: "#f2f9ff",
  };

  return (
    <div>
      <Banner text={`Welcome, ${user?.displayName || user?.email}!`} />
      <div style={PortalCenterDiv}>
        <PortalCenter role={role} />
      </div>
      <WebFooter />
    </div>
  );
}

export default Dashboard;
