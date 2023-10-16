import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import WebFooter from "./WebFooter.jsx";
import GreetingCard from "./dashboard components/GreetingCard.jsx";
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
  };

  return (
    <div>
      <GreetingCard name={user?.displayName || user?.email} />
      <div style={PortalCenterDiv}>
        <PortalCenter role={role} />
      </div>
      <WebFooter />
    </div>
  );
}

export default Dashboard;
