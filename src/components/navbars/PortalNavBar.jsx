import React from "react";
import {
  DropdownToggle,
  Nav,
  Navbar,
} from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import RadioArchiveLogo from "../../assets/RadioArchiveLogo.png";
import person from "../../assets/person.png";
import { useAuth } from "../../contexts/AuthContext";
import "./PortalNavBar.css";

const PortalNavBar = ({ title }) => {
  const { user, role, signout } = useAuth();

  const titleColor = (role) => {
    switch (role) {
      case "Patient":
        return "#479f76";
      case "Physician":
        return "#0D6EFD";
      case "Radiologist":
        return "#DC3545";
      default:
        return "#479f76";
    }
  };

  const titleStyle = {
    fontSize: "2rem",
    color: titleColor(role),
  };
  const dropdownStyle = {
    backgroundColor: titleColor(role),
  };
  const dropdownLogo = {
    width: "2rem",
    innerHeight: "2rem",
    backgroundColor: titleColor(role),
  };
  const boldName = {
    fontWeight: "500",
  };

  return (
    <Navbar className="navbar">
      <Navbar.Brand>
        <a href="/" className="navbar-logo">
          <img src={RadioArchiveLogo} />
          <span className="titleSpans" id="radiology">
            Radiology
          </span>
          <span className="titleSpans" id="archive">
            {" "}
            Archive
          </span>
        </a>
      </Navbar.Brand>
      <Nav className="mr-auto">
        <span style={titleStyle}>{title}</span>
      </Nav>

      <Dropdown align="end" style={{marginRight: "50px"}}>
        <DropdownToggle id="loginDropdown" style={dropdownStyle}>
          <span aria-hidden="true">
            <img src={person} style={dropdownLogo} />
          </span>
        </DropdownToggle>
        <Dropdown.Menu>
          <Dropdown.ItemText style={boldName}>
            {user.displayName || user.email}
          </Dropdown.ItemText>
          <Dropdown.Item href="/dashboard">Profile</Dropdown.Item>
          <Dropdown.Item href="TODO" disabled={true}>
            Notifications
          </Dropdown.Item>
          <Dropdown.Item onClick={signout}>Log Out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Navbar>
  );
};

export default PortalNavBar;
