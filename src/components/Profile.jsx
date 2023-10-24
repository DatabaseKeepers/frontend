import React from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { API_URL } from "../constants";
import { useAuth } from "../contexts/AuthContext";
import EditProfile from "./EditProfile";
import WebFooter from "./WebFooter";

function Profile() {
  const { role, user } = useAuth();

  const [data, setData] = React.useState(null);

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

  React.useEffect(() => {
    const getProfile = async () => {
      const response = await fetch(`${API_URL}/api/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.accessToken,
        },
      });
      const data = await response.json();
      setData(data);
    };
    getProfile();
  }, []);

  if (!data)
    return (
      <Row className="justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Row>
    );

  return (
    <>
      <Container fluid style={{ background: "#f2f9ff" }} className="p-5">
        <h2 className="mb-5" style={{ color: "#0d6efd" }}>
          Your Profile
        </h2>
        <Row className="mb-3">
          <Col xs={5} md={4}>
            <strong>Name</strong>
          </Col>
          <Col className="fw-semibold">
            {(data.profile.title || "") +
              " " +
              data.profile.first_name +
              " " +
              data.profile.last_name}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={5} md={4}>
            <strong>DOB</strong>
          </Col>
          <Col className="fw-semibold">{data.profile.dob}</Col>
        </Row>
        <Row className="mb-3">
          <Col xs={5} md={4}>
            <strong>Email</strong>
          </Col>
          <Col className="fw-semibold">{data.profile.email}</Col>
        </Row>
        <Row>
          <Col
            xs={12}
            md={8}
            className="my-4"
            style={{ height: "2px", backgroundColor: "#0D6EFD" }}
          />
        </Row>
        {role !== "Patient" ? (
          <Row className="my-3">
            <Col xs={5} md={4}>
              <strong>Your Patients</strong>
            </Col>
            <Col>
              <Link
                className="fw-semibold"
                variant="primary"
                to="/patients"
                style={{ textDecoration: "none", color: "#7749f8" }}
              >
                View My Patients
              </Link>
            </Col>
          </Row>
        ) : (
          <>
            {data.staff.length > 0 &&
              data.staff.map((staff) => {
                const fullName =
                  (staff.title || "") +
                  " " +
                  staff.first_name +
                  " " +
                  staff.last_name;
                if (staff.role === "PHYSICIAN") {
                  return (
                    <Row key={staff.uid} className="my-3">
                      <Col xs={5} md={4}>
                        <strong>Physician</strong>
                      </Col>
                      <Col className="fw-semibold">
                        <span>{fullName}</span>
                      </Col>
                    </Row>
                  );
                }
                if (staff.role === "RADIOLOGIST") {
                  return (
                    <Row className="my-3" key={staff.uid}>
                      <Col xs={5} md={4}>
                        <strong>Radiologist</strong>
                      </Col>
                      <Col className="fw-semibold">
                        <span>{fullName}</span>
                      </Col>
                    </Row>
                  );
                }
              })}
          </>
        )}
        <EditProfile
          profile={data.profile}
          roleColor={roleColor(role)}
          role={role}
        />
        <Row style={{ marginTop: "16rem" }}>
          <Col xs={4}>
            <Button
              as={Link}
              to="/dashboard"
              style={{
                border: roleColor(role),
                backgroundColor: roleColor(role),
              }}
            >
              Back to Dashboard
            </Button>
          </Col>
        </Row>
      </Container>
      <WebFooter />
    </>
  );
}

export default Profile;
