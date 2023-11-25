import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../constants";
import { useAuth } from "../contexts/AuthContext";
import Banner from "./Banner";
import LoadingSpinner from "./LoadingSpinner";
import WebFooter from "./WebFooter";
import SecondOpinionCenter from "./second opinion components/SecondOpinionCenter";
import SecondOpinionImageSelectionModal from "./second opinion components/SecondOpinionImageSelectModal";

function SecondOpinion() {
  const [loading, setLoading] = useState(true);
  const [image, setSelectedImage] = useState();
  const [images, setImages] = useState([]);
  const [invoicing, setInvoicing] = useState(false);
  const [radiologist, setRadiologist] = useState("");
  const [radiologists, setRadiologists] = useState([]);
  const [showImageSelectionModal, setShowImageSelectionModal] = useState(false);

  const navigate = useNavigate();
  const { user, role } = useAuth();

  const disableButton =
    radiologist === "" || radiologist === "Select a radiologist";

  const firstDivStyle = {
    margin: "3rem",
  };
  const headerStyle = {
    color: "#0D6EFD",
  };
  const headerParagraphStlye = {
    fontWeight: "bold",
  };
  const secondDivStyle = {
    margin: "5rem",
  };
  const signupButtonStyle = {
    width: "165px",
    marginTop: "2rem",
    fontSize: "20px",
    marginLeft: "3rem",
  };

  const confirmToPayment = async () => {
    setInvoicing(true);

    await fetch(`${API_URL}/api/payment/${radiologist}/invoice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setInvoicing(false);
        alert(data.msg);
        navigate("/invoices");
      })
      .catch((error) => {
        setInvoicing(false);
        console.log(error);
      })
      .finally(() => setInvoicing(false));
  };

  const handleRadiologistSelect = async (e) => {
    e.preventDefault();
    setShowImageSelectionModal(true);
  };

  useEffect(() => {
    const getImages = async () => {
      fetch(`${API_URL}/api/user/${user.uid}/images`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.accessToken,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Fetch failed");
          }
          return response.json();
        })
        .then((data) => {
          setImages(data.images);
        })
        .catch((err) => console.error("Error fetching data: ", err));
    };
    const getRadiologists = () => {
      fetch(API_URL + "/api/user/radiologists", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setLoading();
          setRadiologists(data.radiologists);
        })
        .catch((err) => {
          setLoading(false);
          console.error("Error fetching data:", err);
        });
    };
    getImages();
    getRadiologists();
  }, []);

  return (
    <>
      <Banner text="Radiologist Center" />
      {showImageSelectionModal && (
        <SecondOpinionImageSelectionModal
          confirmToPayment={confirmToPayment}
          images={images}
          invoicing={invoicing}
          showModal={showImageSelectionModal}
          handleClose={setShowImageSelectionModal}
          selectedImage={image}
          setSelectedImage={setSelectedImage}
        />
      )}

      <div style={firstDivStyle}>
        <h2 style={headerStyle}>Our Radiologists!</h2>
        <br></br>
        <p style={headerParagraphStlye}>
          Please go over which radiologist below best matches your needs.
        </p>
      </div>

      <div style={secondDivStyle}>
        <SecondOpinionCenter radiologists={radiologists} />
      </div>

      <div style={secondDivStyle}>
        {user ? (
          <Container className="my-5">
            <Row>
              <Form.Label htmlFor="radiologistSelect">
                Select the radiologist that is best for you!
              </Form.Label>
              {loading && <LoadingSpinner />}
              <Col xs={12} sm={6}>
                <Form onSubmit={handleRadiologistSelect}>
                  <Form.Select
                    id="radiologistSelect"
                    onChange={(e) => setRadiologist(e.target.value)}
                  >
                    <option>Select a radiologist</option>
                    {role === "Patient" &&
                      radiologists.map((r) => {
                        const fullName =
                          r.title + " " + r.first_name + " " + r.last_name;
                        return (
                          <option key={r.uid} value={r.uid}>
                            {fullName}
                          </option>
                        );
                      })}
                  </Form.Select>

                  <Button
                    className="my-5"
                    variant="primary"
                    type="submit"
                    disabled={disableButton}
                  >
                    Go to Image Selection
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        ) : (
          <Link
            to="/signup"
            className="btn btn-primary"
            style={signupButtonStyle}
          >
            Sign up here
          </Link>
        )}
      </div>

      <WebFooter />
    </>
  );
}

export default SecondOpinion;
