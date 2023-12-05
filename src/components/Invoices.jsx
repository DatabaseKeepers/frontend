import { useEffect, useState } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { Link, useNavigate } from "react-router-dom";
import checkmark from "../assets/checkmark.png";
import { API_URL } from "../constants.js";
import { useAuth } from "../contexts/AuthContext";
import Banner from "./Banner";

function Invoices() {
  const [pageIsFocus, setPageIsFocus] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleFocusPage = () => {
      setPageIsFocus(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleFocusPage);
    if (pageIsFocus) window.location.reload();

    return () => {
      document.addEventListener("visibilitychange", handleFocusPage);
    };
  }, [pageIsFocus]);

  useEffect(() => {
    const getInvoices = async () => {
      const response = await fetch(`${API_URL}/api/payment/invoices`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.accessToken,
        },
      });
      const res = await response.json();
      setInvoices(res.data);
      setLoading(false);
    };
    getInvoices();
  }, []);

  return (
    <div>
      <Banner text="Invoices Center" />
      <Container className="text-center">
        {loading && (
          <Spinner
            animation="border"
            role="status"
            style={{
              placeSelf: "center",
              width: "8rem",
              height: "8rem",
              margin: "2rem",
              color: "#0D6EFD",
            }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        <ListGroup className="my-3">
          {!loading && invoices.length > 0 ? (
            invoices.map((invoice) => {
              return (
                <ListGroup.Item
                  as={Link}
                  className="py-5 text-center shadow-sm"
                  to={invoice.url}
                  rel="noopener noreferrer"
                  target="_blank"
                  key={invoice.uid}
                >
                  <Row>
                    <Col>
                      <p className="fs-4">Invoice created</p>
                      <p className="fw-light">
                        {new Date(invoice.createdAt + "UTC").toLocaleString(
                          [],
                          { dateStyle: "short", timeStyle: "short" },
                          "en-US"
                        )}
                      </p>
                    </Col>
                    <Col className="fs-4 fw-bold">${invoice.amount}</Col>
                    <Col
                      className={`fs-5 ${
                        invoice.paid ? "text-success" : "text-danger"
                      }`}
                    >
                      {invoice.paid ? (
                        <img
                        src={checkmark} className="checkmark"
                        alt="checkmark"
                        style={{width: '50px', height: '50px'}}
                        />
                      ) : (
                        <div>
                          <p>unpaid</p>
                          <p><i>click to pay</i></p>
                        </div>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })
          ) : (
            <Container className="text-center fs-3 fw-bolder p-5">
              <p>No invoices available.</p>
            </Container>
          )}
        </ListGroup>
        <Row>
          <Col>
            <Button
            className = "mb-4"
            onClick = {() => navigate("/dashboard")}
            >
              Back to Dashboard
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Invoices;
