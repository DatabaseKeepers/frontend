import React from "react";
import docvisit from "../../assets/docvisit.png";
import { API_URL } from "../../constants.js";
import WebFooter from "../WebFooter.jsx";
import default_profile_picture from "../../assets/default_profile_picture.png";

import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [radiologists, setRadiologists] = React.useState([]);

  React.useEffect(() => {
    const getRadiologists = async () => {
      const response = await fetch(
        `${API_URL}/api/user/meet-our-radiologists`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      setRadiologists(data.radiologists);
    };
    getRadiologists();
  }, []);

  return (
    <Container fluid className="g-0" style={{ backgroundColor: "#f2f9ff" }}>
      <div className="hero">
        <Container>
          <Row className="align-items-center py-5 py-md-3">
            <Col className="text-white" xs={12} md={6}>
              <h1 className="fst-italic">
                Get your medical scan interpreted today.
              </h1>
              <p>
                We provide a variety selection of radiologists for you to choose
                from. <br /> View your physician's notes and get a second
                opinion.
              </p>
              <Link to="/signup" className="btn btn-primary signup">
                Sign Up
              </Link>
            </Col>
            <Col xs={12} md={6}>
              <Image fluid src={docvisit} />
            </Col>
          </Row>
        </Container>
      </div>
      <div>
        <Container fluid className="p-5 g-0">
          <Row className="justify-content-center text-center align-items-center pb-5">
            <Col>
              <h3
                className="px-5 py-2"
                style={{
                  color: "#0D6EFD",
                  display: "inline-block",
                  borderBottom: "3px solid #0D6EFD",
                }}
              >
                Meet Our Radiologists!
              </h3>
            </Col>
          </Row>
          <Container>
            <Row className="mx-auto text-center text-md-normal">
              {radiologists &&
                radiologists.map((radiologist) => (
                  <Col
                    key={radiologist.uid}
                    className="d-md-flex justify-content-md-center my-3 my-sm-4"
                    xs={12}
                    sm={6}
                  >
                    <Col md={5}>
                      <Image
                        className="ms-lg-5"
                        src={
                          radiologist.profile_image_url ||
                          default_profile_picture
                        }
                        alt={radiologist.first_name}
                        style={{
                          minWidth: "100px",
                          maxWidth: "100px",
                          minHeight: "100px",
                          maxHeight: "100px",
                        }}
                      />
                    </Col>
                    <Col className="doctordetails text-md-start">
                      <span className="doctornames my-1">
                        {radiologist.title +
                          " " +
                          radiologist.first_name +
                          " " +
                          radiologist.last_name}
                      </span>
                      <span className="my-1">
                        Specialization: {radiologist.expertise}
                      </span>
                    </Col>
                  </Col>
                ))}
            </Row>
          </Container>
          <Row className="mt-5">
            <Col className="d-flex justify-content-center">
              <Button
                className="fs-5"
                as={Link}
                src="signup"
                to="/secondopinion"
              >
                View Radiologists
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <WebFooter />
    </Container>
  );
}

export default Home;
