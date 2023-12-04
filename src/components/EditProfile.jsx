import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import default_profile_picture from "../assets/default_profile_picture.png";
import { API_URL, MODE } from "../constants.js";
import { useAuth } from "../contexts/AuthContext";
import Banner from "./Banner";
import ProfileStaff from "./ProfileStaff";
import WebFooter from "./WebFooter";

function EditProfile(props) {
  const { profile_image_url, bio, allow_ratings } = props.profile;
  const { isEditing, setIsEditing } = props;
  const { roleColor } = props;
  const { role, staff } = props;
  const { setData } = props;
  const { signin, user } = useAuth();
  const [showEmailModal, setShowEmailModal] = useState(false); // State to manage modal visibility

  const handleShowEmailModal = () => setShowEmailModal(true);
  const handleCloseEmailModal = () => setShowEmailModal(false);

  const [newBio, setNewBio] = React.useState(bio ?? "");
  const [profileImage, setProfileImage] = React.useState();
  const [previewImageURL, setPreviewImageURL] =
    React.useState(profile_image_url);
  const navigate = useNavigate();
  const [uploading, setUploading] = React.useState(false);
  const bioFormRef = React.useRef(null);

  const [showEmailUpdate, setShowEmailUpdate] = React.useState(false);
  const [newEmail, setNewEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");

  const [optStatus, setOptStatus] = React.useState(!!allow_ratings); // cast allow_ratings to boolean
  const [password, setPassword] = React.useState("");

  const allowBioEdit = role === "Physician" || role === "Radiologist";
  const noProfileChanges =
    ("" === newBio || bio === newBio) &&
    previewImageURL === profile_image_url &&
    optStatus === !!allow_ratings;

  const handleOptStatusChange = (e) => {
    setOptStatus(e.target.value !== "optOut");
  };

  const handleEmailUpdate = () => {
    // Validate and send the new email to the API
    // Reset the state and close the form after update
    if (!newEmail || !password) {
      setEmailError("Email and password are required.");
      return;
    }
    setEmailError("");

    // API request to update email using PUT method
    fetch(API_URL + "/api/user/email", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.accessToken,
      },
      body: JSON.stringify({
        email: newEmail,
        password: password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Handle successful response
        if (data.success) {
          // Update the profile state
          setData((prev) => ({
            ...prev,
            profile: {
              ...prev.profile,
              email: newEmail,
            },
          }));

          // Sign in to refresh auth context
          signin(newEmail, password);

          alert(data.msg);
          setShowEmailUpdate(false);
          setNewEmail(""); // Optionally reset the email state
          setPassword(""); // Optionally reset the password state

          handleCloseEmailModal();
        } else {
          setEmailError(data.errors[0].msg || "Failed to update email.");
          setPassword("");
        }
      })
      .catch((error) => {
        // Handle network errors or other unexpected errors
        setEmailError(error.message);
        setPassword("");
      });
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
      setPreviewImageURL(null);
    }
  };

  const handleBioInput = (e) => {
    setNewBio(e.target.value);
  };

  React.useEffect(() => {
    if (profileImage) {
      const url = URL.createObjectURL(profileImage);
      setPreviewImageURL(url);

      return () => URL.revokeObjectURL(previewImageURL);
    }
  }, [profileImage]);

  React.useEffect(() => {
    // Only Physicians and Radiologists can edit right now
    if (allowBioEdit && isEditing) {
      // Dynamically adjust the bio form textarea's height based on its content
      bioFormRef.current.style.height = "auto";
      bioFormRef.current.style.height = `${bioFormRef.current.scrollHeight}px`;
    }
  }, [isEditing]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // Only update bio if profile image is not being updated
    if (profile_image_url === previewImageURL) {
      fetch(`${API_URL}/api/user/profile`, {
        method: "PUT",
        body: JSON.stringify({
          profile_image_url,
          bio: newBio,
          enableRatingSystem: optStatus,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.accessToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert("Saved profile successfully!");
            setTimeout(() => navigate(0), 500);
          }
        })
        .catch((error) => {
          console.log("Error getting image URL: ", error);
          setUploading(false);
        })
        .finally(() => setUploading(false));
    } else if (previewImageURL) {
      // Update both profile image and bio
      const file_name = uuid();
      const storage = getStorage();
      const storageRef = ref(storage, `${MODE}/${file_name}`);

      const uploadTask = uploadBytesResumable(storageRef, profileImage);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          switch (snapshot.state) {
            case "running":
              setUploading(true);
              break;
            case "error":
            case "canceled":
              setUploading(false);
              break;
          }
        },
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL) => {
              await fetch(`${API_URL}/api/user/profile`, {
                method: "PUT",
                body: JSON.stringify({
                  profile_image_url: downloadURL,
                  bio: newBio,
                  enableRatingSystem: optStatus,
                }),
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + user.accessToken,
                },
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.success) {
                    alert("Saved profile successfully!");
                    setTimeout(() => navigate(0), 500);
                  }
                });
            })
            .catch((error) => {
              console.log("Error getting image URL: ", error);
              setUploading(false);
            })
            .finally(() => setUploading(false));
        }
      );
    }
  };
  const emailUpdateForm = (
    <Container className="py-5">
      <h3 className="mb-5" style={{ color: "#0d6efd" }}>
        Change Email
      </h3>
      <p>
        To update your email, please provide your new email and current password
      </p>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="newEmail">New Email</Form.Label>
          <Form.Control
            id="newEmail"
            name="newEmail"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter your new email"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password to confirm"
          />
          {emailError && <div className="text-danger">{emailError}</div>}
        </Form.Group>
        <Row className="pt-3 justify-content-center">
          <Col xs={3}>
            <Button
              className="w-100"
              variant="secondary"
              onClick={handleCloseEmailModal} // Close the modal on cancel
            >
              Cancel
            </Button>
          </Col>
          <Col xs={3}>
            <Button className="w-100" onClick={handleEmailUpdate}>
              Confirm
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
  return (
    <>
      <Banner text="Profile Information" />
      <Container fluid style={{ background: "#f2f9ff" }} className="p-5">
        <h3 className="mb-5" style={{ color: "#0d6efd" }}>
          Editing Profile
        </h3>
        <Container
          className="rounded p-3 shadow-sm"
          style={{ backgroundColor: "#fff", overflow: "auto" }}
          fluid
        >
          <Row className="mb-3">
            <Col className="text-center" xs={12} md={2}>
              <img
                src={
                  previewImageURL ||
                  profile_image_url ||
                  default_profile_picture
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
                  {(props.profile.title || "") +
                    " " +
                    props.profile.first_name +
                    " " +
                    props.profile.last_name}
                </Col>
              </Row>
              <Row className="mb-3 align-items-center">
                <Col xs={5} md={2}>
                  <strong>Email</strong>
                </Col>
                <Col className="fw-semibold">{props.profile.email}</Col>
              </Row>
              <Row className="mb-3 align-items-center">
                <Col xs={5} md={2}>
                  <strong>DOB</strong>
                </Col>
                <Col className="fw-semibold">{props.profile.dob}</Col>
                <Col className="text-end">
                  <div className="rounded-pill">
                    {(role === "Patient" || role === "Physician") && (
                      <Button
                        onClick={handleShowEmailModal}
                        style={{
                          border: "#838383",
                          backgroundColor: "#838383",
                          color: "#fff",
                          marginBottom: "10px",
                          borderRadius: "20px",
                        }}
                      >
                        Update Email
                      </Button>
                    )}
                  </div>
                  <div className="rounded-pill">
                    <input
                      id="fileInput"
                      type="file"
                      onChange={handleChange}
                      onClick={(e) => (e.target.value = null)}
                      style={{
                        border: "#838383",
                        backgroundColor: "#838383",
                        display: "none",
                      }}
                    />
                    <label
                      className="btn rounded-pill"
                      style={{
                        border: "#838383",
                        backgroundColor: "#838383",
                        color: "#fff",
                      }}
                      htmlFor="fileInput"
                    >
                      Change Picture
                    </label>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col xs={12} className="my-4" style={{ height: "2px" }} />
              </Row>

              {role === "Physician" ? (
                <Row className="mt-5">
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
                <ProfileStaff staff={staff} />
              )}
            </Col>
          </Row>

          {allowBioEdit && (
            <Row>
              <Col>
                {isEditing ? (
                  <Form.Control
                    className="rounded p-3 shadow-sm"
                    as="textarea"
                    value={newBio}
                    onChange={handleBioInput}
                    ref={bioFormRef}
                    rows={12}
                  />
                ) : (
                  <p style={{ color: "#68717a", whiteSpace: "pre-wrap" }}>
                    {bio || ""}
                  </p>
                )}
              </Col>
            </Row>
          )}
          {role === "Radiologist" && (
            <Row className="mt-4">
              <Col>
                <Form.Group className="mb-3">
                  <div>
                    <Form.Label style={{ marginRight: "50px" }}>
                      Rating System Preference :
                    </Form.Label>

                    <label style={{ marginRight: "50px" }}>
                      <input
                        type="radio"
                        name="optStatus"
                        value="optIn"
                        checked={optStatus === true}
                        onChange={handleOptStatusChange}
                      />{" "}
                      Opt In
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="optStatus"
                        value="optOut"
                        checked={optStatus === false}
                        onChange={handleOptStatusChange}
                      />{" "}
                      Opt Out
                    </label>
                  </div>
                </Form.Group>
              </Col>
            </Row>
          )}
        </Container>

        <Row
          className="text-center"
          style={{ marginTop: "8rem", marginBottom: "10rem" }}
        >
          <Col xs={8} md={6}>
            <Button
              className="mx-2"
              style={{ border: "#6c757d", backgroundColor: "#6c757d" }}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button
              className="mx-2"
              style={{ border: roleColor, backgroundColor: roleColor }}
              onClick={handleSaveProfile}
              disabled={noProfileChanges || uploading}
            >
              Save Changes{" "}
              {uploading && (
                <Spinner size="sm" className="mx-2" animation="border" />
              )}
            </Button>
          </Col>
        </Row>

        <Modal
          show={showEmailModal}
          onHide={handleCloseEmailModal}
          backdrop="static"
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>{emailUpdateForm}</Modal.Body>
        </Modal>
      </Container>
      <WebFooter />
    </>
  );
}

export default EditProfile;
