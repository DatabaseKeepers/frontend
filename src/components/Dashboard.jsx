import { useNavigate } from "react-router-dom";
import PortalNavBar from "./navbars/PortalNavBar.jsx";
import "./navbars/PortalNavBar.css";
import PortalCenter from "./dashboard components/PortalCenter.jsx";
import WebFooter from "./WebFooter.jsx";
import GreetingCard from "./dashboard components/GreetingCard.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useEffect } from "react";

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
      <PortalNavBar title={role} />
      <GreetingCard role={role} name={user.displayName || user.email} />
      <div style={PortalCenterDiv}>
        <PortalCenter />
      </div>
      <WebFooter />
    </div>
  );
}

export default Dashboard;
