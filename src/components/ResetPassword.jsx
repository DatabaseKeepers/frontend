import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../constants";
import RadioArchiveLogo from "../assets/RadioArchiveLogo.png";
import checkmark from "../assets/checkmark.png";
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import "./Form.css";


function ResetPassword() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to reset password
    fetch(API_URL + "/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          // Show the email sent checkmark or navigate to a confirmation page
          setSuccess(true);
          // You can also navigate to a different page or show a message here
        } else {
          // Handle the case where the response is not successful
          console.error("Error: ", response.errors[0].msg);
        }
      })
      .catch((err) => console.error(err));
  };

  function LogoHeader() {
    return (
      <h1> 
        <Link className="text-decoration-none" to="/">
          <img src={RadioArchiveLogo} alt="Radiology Archive Logo" />
          <span className="titleSpans" id="radiology">
            Radiology
          </span>
          <span className="titleSpans" id="archive">
            Archive
          </span>
        </Link>
      </h1>
    );
  }

  function Success() {
    return (
      <div className="signinWrapper"> 
      <Container className="signinContainer successContainer"> 
      <div className="container-lg d-flex flex-column justify-content-center align-items-center my-3">
        <LogoHeader />
        <h2 className="fw-bold text-primary my-4">Email Sent!</h2>
        <img src={checkmark} className="checkmark my-4" alt="checkmark"></img>
        <p className="mt-3 mb-5">
          Please check your email and follow the instructions to reset your
          password.
        </p>
        <Link as="button" to="/" className="btn btn-primary w-50">
          Back to Home Page
        </Link>
      </div>
      </Container>
    </div>
    );
  }

  if (success) {
    return <Success />;
  } else {

    return (
      <div className="signinWrapper">
        <Container className="signinContainer d-flex flex-column">
          <Row className="justify-content-center">
            <Col md={8} lg={7}>
              <Form onSubmit={handleSubmit}>
               <LogoHeader />
               <p className="directions"> 
                Please enter your account’s email address and we’ll send you an
                email with instructions to reset your password.
              </p>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                required
              />
              </Form.Group>
              <Button variant="primary" type="submit" className="option w-100 mb-5"> 
                    Continue
                    </Button>
                    <p className="text-center mt-4 option" style={{ fontStyle: 'italic' }}>New User?</p> 
                    <div className="text-center mt-2 option">
                    <Button variant="secondary" onClick={() => navigate("/signup")}>
                    Sign Up
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ResetPassword;
