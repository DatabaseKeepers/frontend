import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";
import { useAuth } from "../contexts/AuthContext";
import Banner from "./Banner";
import WebFooter from "./WebFooter";
import SecondOpinionCenter from "./second opinion components/SecondOpinionCenter";

function SecondOpinion() {
  const [radiologists, setRadiologists] = useState([]);
  const [invoicing, setInvoicing] = useState(false);
  const navigate = useNavigate();
  const { user, role } = useAuth();

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
    height: "50px",
    marginTop: "2rem",
    fontSize: "20px",
    marginLeft: "3rem",
  };

  const handleRadiologistSelect = async (e) => {
    e.preventDefault();
    setInvoicing(true);
    const radiologist_uid = e.target.radiologistSelect.value;

    await fetch(`${API_URL}/api/payment/${radiologist_uid}/invoice`, {
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

  useEffect(() => {
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
          setRadiologists(data.radiologists);
        })
        .catch((err) => console.error("Error fetching data:", err));
    };
    getRadiologists();
  }, []);

  return (
    <>
      <Banner text="Radiologist Center" />

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
              <Col xs={12} sm={6}>
                <Form onSubmit={handleRadiologistSelect}>
                  <Form.Select id="radiologistSelect">
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

                  <Button className="my-5" variant="primary" type="submit">
                    {invoicing ? (
                      <Spinner
                        className="mx-5"
                        size="sm"
                        animation="border"
                        role="status"
                      >
                        <span className="visually-hidden">Invoicing...</span>
                      </Spinner>
                    ) : (
                      "Confirm and Go to Payment"
                    )}
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        ) : (
          <a href="signup">
            <button className="btn btn-primary" style={signupButtonStyle}>
              Sign up here
            </button>
          </a>
        )}
      </div>

      <WebFooter />
    </>
  );
}

export default SecondOpinion;
