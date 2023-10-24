import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import default_profile_picture from "../assets/default_profile_picture.png";
import { API_URL, MODE } from "../constants.js";
import { useAuth } from "../contexts/AuthContext";

function EditProfile(props) {
  const { profile_image_url, bio } = props.profile;
  const { roleColor } = props;
  const { role } = props;
  const { user } = useAuth();

  const [isEditing, setIsEditing] = React.useState(false);
  const [newBio, setNewBio] = React.useState(bio);
  const [profileImage, setProfileImage] = React.useState();
  const [previewImageURL, setPreviewImageURL] = React.useState(profile_image_url);
  const navigate = useNavigate();
  const [uploading, setUploading] = React.useState(false);
  const bioFormRef = React.useRef(null);

  const allowBioEdit = role === "Physician" || role === "Radiologist";

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
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.accessToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setUploading(false);
            alert("Saved profile successfully!");
            setTimeout(() => navigate(0), 500);
          }
        })
        .catch((error) => {
          console.log("Error getting image URL: ", error);
          setUploading(false);
        });
    }

    // Update both profile image and bio
    if (profile_image_url && previewImageURL) {
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
                }),
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + user.accessToken,
                },
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.success) {
                    setUploading(false);
                    alert("Saved profile successfully!");
                    setTimeout(() => navigate(0), 500);
                  }
                });
            })
            .catch((error) => {
              console.log("Error getting image URL: ", error);
              setUploading(false);
            });
        }
      );
    }
  };

  return (
    <Container fluid className="p-0">
      {isEditing && (
        <h2 className="my-5" style={{ color: "#0d6efd" }}>
          Editting profile
        </h2>
      )}
      <Card className="p-4" style={{ backgroundColor: "#adb5bd" }}>
        <Card.Title className="mb-3">
          <div
            className={`d-flex align-items-center ${
              isEditing ? "justify-content-normal" : "justify-content-between"
            }`}
          >
            <img
              src={
                previewImageURL || profile_image_url || default_profile_picture
              }
              alt="User Profile"
              className="me-3"
            />
            {isEditing ? (
              <div className="d-flex align-self-end">
                <input
                  id="fileInput"
                  type="file"
                  onChange={handleChange}
                  onClick={(e) => (e.target.value = null)}
                  style={{ border: "none", display: "none" }}
                />
                <label
                  className="btn"
                  style={{ backgroundColor: "#0dcaf0", color: "#fff" }}
                  htmlFor="fileInput"
                >
                  Change Picture
                </label>
              </div>
            ) : (
              <Button
                style={{ border: roleColor, backgroundColor: roleColor }}
                onClick={() => setIsEditing((prev) => !prev)}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </Card.Title>
        {allowBioEdit && (
          <Card.Body className="rounded" style={{ backgroundColor: "#fff" }}>
            {isEditing ? (
              <Form.Control
                as="textarea"
                value={newBio}
                onChange={handleBioInput}
                ref={bioFormRef}
                rows={12}
              />
            ) : (
              <Card.Text style={{ color: "#68717a", whiteSpace: "pre-wrap" }}>
                {bio || ""}
              </Card.Text>
            )}
          </Card.Body>
        )}
      </Card>
      {isEditing && (
        <Row className="my-5 text-center">
          <Col xs={12}>
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
            >
              Save Changes{" "}
              {uploading && (
                <Spinner size="sm" className="mx-2" animation="border" />
              )}
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default EditProfile;
