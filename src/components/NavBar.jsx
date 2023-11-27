import { memo, useEffect, useState } from "react";
import { Button, Nav, Navbar, NavbarText } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RadioArchiveLogo from "../assets/RadioArchiveLogo.png";
import bell from "../assets/bell.png";
import person from "../assets/person.png";
import { useAuth } from "../contexts/AuthContext";
import { useNotifications } from "../contexts/NotificationContext";
import "./NavBar.css";

const SHOW_TITLE_PATHS = ["/dashboard", "/profile", "/notifications"];
const HIDE_NAVBAR_PATHS = ["/signin", "/signup", "/reset-password"];

const NavBar = memo(() => {
  const location = useLocation();

  const { role, user, signout } = useAuth();
  const { notifications } = useNotifications();
  const unreadNotifications = notifications.filter(
    (notification) => notification.read === 0
  );

  const [showTitle, setShowTitle] = useState(false);
  const navigate = useNavigate();

  const roleColor = (role) => {
    switch (role) {
      case "Patient":
        return "#479f76";
      case "Physician":
        return "#0D6EFD";
      case "Radiologist":
        return "#E35D6A";
    }
  };

  const backgroundStyle = {
    backgroundColor: roleColor(role),
    border: roleColor(role),
    height: "100%",
  };
  const titleStyle = {
    color: roleColor(role),
  };
  const DropdownLogo = {
    width: "2.5rem",
    innerHeight: "2rem",
  };
  const boldName = {
    fontWeight: "500",
  };
  const bellNotification = {
    height: "40px",
    width: "auto",
  };
  const bellDiv = {
    position: "relative",
    backgroundColor: "#FFDA6A",
    border: "#FFDA6A",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
    width: "60px",
    height: "100%",
    display: "flex",
    marginLeft: "2rem",
    marginRight: "3.5rem",
  };

  useEffect(() => {
    if (SHOW_TITLE_PATHS.includes(location.pathname)) {
      setShowTitle(true);
    } else {
      setShowTitle(false);
    }
  }, [location.pathname]);

  if (HIDE_NAVBAR_PATHS.includes(location.pathname)) {
    return <></>;
  }

  const LoggedOutDropdown = () => {
    return (
      <div className="container">
        <div className="loginContain">
          <span className="buttonText">Returning User?</span>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="loginDropdown">
              Log In
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  navigate("/signin", { state: { role: "Patient" } });
                }}
              >
                Patient
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  navigate("/signin", { state: { role: "Physician" } });
                }}
              >
                Physician
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  navigate("/signin", { state: { role: "Radiologist" } });
                }}
              >
                Radiologist
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="signupContainer">
          <span className="buttonText">New User?</span>
          <Link to="/signup">
            <Button className="btn btn-primary signup">Sign up</Button>
          </Link>
        </div>
      </div>
    );
  };

  const PortalTitle = memo(({ role }) => {
    return (
      <>
        {showTitle && !role && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {showTitle && role && (
          <Nav className="mr-auto text-nowrap">
            <h2>
              <span style={titleStyle}>{role}</span> Portal
            </h2>
          </Nav>
        )}
      </>
    );
  });

  const LoggedInDropdown = memo(({ user, signout }) => {
    return (
      <>
        <div style={{ display: "flex", alignItems: "center", height: "50px" }}>
          <div style={bellDiv}>
            <a href="/notifications">
              <img src={bell} style={bellNotification} />
              {unreadNotifications.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {unreadNotifications.length}
                  <span className="visually-hidden">unread notifications</span>
                </span>
              )}
            </a>
          </div>
          <Dropdown align="end" className="me-5" style={{ height: "100%" }}>
            <Dropdown.Toggle style={backgroundStyle} id="loginDropdown">
              <img src={person} style={DropdownLogo} />
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ width: "max-content" }}>
              <Dropdown.ItemText style={boldName}>
                {user.displayName || user.email}
              </Dropdown.ItemText>
              <Dropdown.Item as={Link} to="/dashboard">
                Dashboard
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/profile">
                Profile
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/notifications">
                Notifications
              </Dropdown.Item>
              <Dropdown.Item onClick={signout}>Log Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </>
    );
  });

  return (
    <Navbar className="navbar shadow-sm" expand="lg">
      <Navbar.Brand as={Link} to="/" className="ms-0 ms-lg-5">
        <img
          src={RadioArchiveLogo}
          width="auto"
          height="30"
          className="d-inline-block"
        />
        <NavbarText id="radiology">Radiology</NavbarText>
        <NavbarText id="archive">Archive</NavbarText>
      </Navbar.Brand>

      <PortalTitle role={role} />

      {user ? (
        <LoggedInDropdown user={user} signout={signout} />
      ) : (
        <LoggedOutDropdown />
      )}
    </Navbar>
  );
});
export default NavBar;
