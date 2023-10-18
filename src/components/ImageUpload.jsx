import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import Image from "react-bootstrap/Image";
import { v4 as uuid } from "uuid";
import { API_URL, MODE } from "../constants.js";
import { useAuth } from "../contexts/AuthContext";
import WebFooter from "./WebFooter";

function ImageUpload() {
  const [selectedPatient, setSelectedPatient] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [notes, setNotes] = React.useState(null);

  const [patients, setPatients] = React.useState([]);
  const [previewImageURL, setPreviewImageURL] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [uploading, setUploading] = React.useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      setImage(e.target.files[0]);
      setPreviewImageURL(null);
      setUploading(false);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const file_name = uuid();
    const storage = getStorage();
    const storageRef = ref(storage, `${MODE}/${file_name}`);

    const uploadTask = uploadBytesResumable(storageRef, image, {
      uploader: user.uid,
    });

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const newProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(newProgress);
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
            await fetch(`${API_URL}/api/user/upload-image`, {
              method: "POST",
              body: JSON.stringify({
                patient: selectedPatient,
                notes: notes,
                url: downloadURL,
              }),
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.accessToken,
              },
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.success) {
                  alert("Image uploaded successfully!");
                  setImage(null);
                  setPreviewImageURL(null);
                  setSelectedPatient("");
                }
              });
          })
          .catch((error) => {
            console.log("Error getting image URL: ", error);
          });
      }
    );
  };

  React.useEffect(() => {
    const getPatients = async () => {
      const response = await fetch(`${API_URL}/api/user/patients`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.accessToken,
        },
      });
      const data = await response.json();
      setPatients(data.patients);
    };
    getPatients();
  }, []);

  React.useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setPreviewImageURL(url);

      return () => URL.revokeObjectURL(previewImageURL);
    }
  }, [image]);

  const uploadEnabled = selectedPatient && image;

  return (
    <>
      <Container fluid style={{ background: "#f2f9ff" }} className="px-5">
        <Form className="py-5" onSubmit={handleUpload}>
          <h2 className="mb-5" style={{ color: "#0d6efd" }}>
            Medical Image Upload
          </h2>
          <Form.Group className="mb-4">
            <Form.Label htmlFor="patientSelect" className="mb-3">
              Please select the patient who will be receiving the medical scan.
            </Form.Label>
            <Form.Select
              id="patientSelect"
              className="w-50 ms-4"
              aria-label="Select a Patient"
              onChange={(e) => setSelectedPatient(e.target.value)}
              name="patient_uid"
              value={selectedPatient}
            >
              {patients ? (
                <option>Select a Patient</option>
              ) : (
                <option>You have no patients</option>
              )}
              {patients &&
                patients.map((patient) => {
                  const patientName =
                    patient.first_name + " " + patient.last_name;
                  return (
                    <option value={patient.uid} key={patient.uid}>
                      {patientName}
                    </option>
                  );
                })}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Label htmlFor="imageUpload" className="d-block mb-3">
              Upload the medical scan that belongs to the chosen patient.
            </Form.Label>
            <Form.Label
              htmlFor="imageUpload"
              className="btn ms-4"
              style={{ backgroundColor: "#0dcaf0", color: "white" }}
            >
              Choose Image
            </Form.Label>
            <Form.Control
              id="imageUpload"
              label="Choose an image"
              onChange={handleChange}
              onClick={(e) => (e.target.value = null)}
              type="file"
              style={{ display: "none" }}
            />
          </Form.Group>

          {previewImageURL && (
            <Container>
              <Row className="justify-content-center">
                <Col className="w-100" style={{ maxWidth: "400px" }}>
                  <Image
                    className="mb-5 w-100"
                    style={{ maxHeight: "300px" }}
                    alt="Preview"
                    src={previewImageURL}
                  />
                </Col>
              </Row>
            </Container>
          )}

          <Form.Group className="mb-5">
            <Form.Text>Attach notes to the patient's medical image.</Form.Text>
            <Form.Control
              name="notes"
              placeholder="Enter your notes here"
              as="textarea"
              rows={5}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Form.Group>

          <Button
            className="mb-5 ms-4"
            variant="primary"
            type="submit"
            disabled={!uploadEnabled}
          >
            Complete Upload
          </Button>

          {uploading && <ProgressBar now={progress} label={`${progress}%`} />}
        </Form>
      </Container>
      <WebFooter />
    </>
  );
}

export default ImageUpload;
