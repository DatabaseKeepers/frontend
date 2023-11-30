import React from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import default_profile_picture from "../assets/default_profile_picture.png";
import { API_URL } from "../constants";
import { useAuth } from "../contexts/AuthContext";
import Banner from "./Banner";
import EditProfile from "./EditProfile";
import "./Profile.css";
import ProfileStaff from "./ProfileStaff";
import WebFooter from "./WebFooter";

function Profile() {
  const { role, user } = useAuth();

  const [data, setData] = React.useState(null);

  const [isEditing, setIsEditing] = React.useState(false);

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

  if (isEditing) {
    return (
      <EditProfile
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        profile={data.profile}
        roleColor={roleColor(role)}
        role={role}
        setData={setData}
        staff={data.staff}
      />
    );
  } else {
    return (
      <>
        <Banner text="Profile Information" />
        <Container fluid style={{ background: "#f2f9ff" }} className="p-5">
          <h3 className="mb-5" style={{ color: "#0d6efd" }}>
            My Profile
          </h3>
          <Container
            className="rounded p-3 shadow-sm"
            style={{ backgroundColor: "#fff", overflow: "auto" }}
            fluid
          >
            <Row className="mb-3">
              <Col className="text-center" xs={12} md={2}>
                <Image
                  fluid
                  src={
                    data.profile.profile_image_url || default_profile_picture
                  }
                  alt="User Profile"
                  className="profile-image"
                />
              </Col>
              <Col xs={12} md={10}>
                <Row className="mb-3 align-items-center">
                  <Col xs={5} md={2}>
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
                <Row className="mb-3 align-items-center">
                  <Col xs={5} md={2}>
                    <strong>Email</strong>
                  </Col>
                  <Col className="fw-semibold">{data.profile.email}</Col>
                </Row>
                <Row className="mb-3 align-items-center">
                  <Col xs={5} md={2}>
                    <strong>DOB</strong>
                  </Col>
                  <Col className="fw-semibold">{data.profile.dob}</Col>
                  <Col className="text-end">
                    <Button
                      className="rounded-pill"
                      style={{
                        border: "#838383",
                        backgroundColor: "#838383",
                      }}
                      onClick={() => setIsEditing((prev) => !prev)}
                    >
                      Edit Profile
                    </Button>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12} className="my-4" style={{ height: "2px" }} />
                </Row>

                {role !== "Patient" ? (
                  <Row className="my-5">
                    <Col xs={5} md={3}>
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
                  <ProfileStaff staff={data.staff} />
                )}
              </Col>
            </Row>
            {role === "Radiologist" && (
              <>
                <p style={{ color: "#68717a", whiteSpace: "pre-wrap" }}>
                  <Form.Control
                    name="bio"
                    className="rounded p-3 bg-body"
                    as="textarea"
                    value={data.profile.bio}
                    rows={12}
                    disabled
                    style={{ resize: "none" }}
                  />
                </p>
                <Row className="my-3 align-items-center">
                  <Col xs={12} className="fw-semibold text-md-start">
                    {data.profile.allow_ratings ? (
                      <p className="mb-0 fs-5">
                        You are opted in to our rating system.
                      </p>
                    ) : (
                      <p className="mb-0 fs-5">
                        You are opted out from our rating system
                      </p>
                    )}
                  </Col>
                </Row>
              </>
            )}
          </Container>
          <Row
            className="text-center"
            style={{ marginTop: "8rem", marginBottom: "10rem" }}
          >
            <Col xs={8} md={6}>
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
}

export default Profile;
