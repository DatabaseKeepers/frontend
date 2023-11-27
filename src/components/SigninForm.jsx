import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import RadioArchiveLogo from "../assets/RadioArchiveLogo.png";
import "./Form.css";
import Signin from "./Signin";

function SigninForm() {
  const { state } = useLocation();
  const role = state?.role || "Patient";

  const patientSpan = {
    color: "#479f76",
    paddingRight: "5px",
  };

  const physicianSpan = {
    color: "#0D6EFD",
    paddingRight: "5px",
  };

  const radiologistSpan = {
    color: "#DC3545",
    paddingRight: "5px",
  };

  const roleSpan = (role) => {
    switch (role) {
      case "Patient":
        return patientSpan;
      case "Physician":
        return physicianSpan;
      case "Radiologist":
        return radiologistSpan;
      default:
        return patientSpan;
    }
  };

  return (
    <div
      className="d-flex justify-content-center"
      style={{ backgroundColor: "#5314ba", height: "100vh" }}
    >
      <Container
        style={{ height: "100vh", maxWidth: "600px" }}
        className="bg-white overflow-auto mx-3 mx-sm-0 justify-content-center"
      >
        <Row className="justify-content-center pt-0 py-3 pt-sm-3">
          <Col className="p-0" xs="auto" sm="auto" md="auto" lg="auto">
            <Image src={RadioArchiveLogo} alt="RadiologyArchive logo" fluid />
          </Col>
          <Col
            className="p-0 align-self-center"
            xs="auto"
            sm="auto"
            md="auto"
            lg="auto"
          >
            <Link className="text-decoration-none" to="/">
              <h2>
                <span className="titleSpans" id="radiology">
                  Radiology
                </span>
                <span className="titleSpans" id="archive">
                  Archive
                </span>
              </h2>
            </Link>
          </Col>
        </Row>

        <Row>
          <h2 className="userType">
            <span style={roleSpan(role)}>{role}</span>Portal
          </h2>
        </Row>

        <Signin />

        <Row className="py-3" />

        <Row className="justify-content-center my-2">
          <Col xs="auto">
            <span className="titleSpans">Forgot password? </span>
            <Link to="/reset-password" className="text-decoration-none">
              Reset Password
            </Link>
          </Col>
        </Row>

        <Row className="justify-content-center my-2">
          <Col xs="auto">
            <span>New User? </span>
            <Button
              as={Link}
              className="border-0 rounded"
              style={{ backgroundColor: "#5314ba", padding: "0.1rem 1.25rem" }}
              to="/signup"
            >
              Sign Up
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SigninForm;
