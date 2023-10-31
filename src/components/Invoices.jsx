import { useEffect, useState } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { API_URL } from "../constants.js";
import { useAuth } from "../contexts/AuthContext";
import Banner from "./Banner";

function Invoices() {
  const [pageIsFocus, setPageIsFocus] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

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
                  as="a"
                  className="py-5 text-center shadow-sm"
                  href={invoice.url}
                  rel="noopener noreferrer"
                  target="_blank"
                  key={invoice.uid}
                >
                  <Row>
                    <Col>
                      <p className="fs-4">Invoice created</p>
                      <p className="fw-light">
                        {new Date(invoice.createdAt).toLocaleString("en-US")}
                      </p>
                    </Col>
                    <Col className="fs-4 fw-bold">${invoice.amount}</Col>
                    <Col
                      className={`fs-5 ${
                        invoice.paid ? "text-success" : "text-danger"
                      }`}
                    >
                      {invoice.paid ? "paid" : "unpaid"}
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
      </Container>
    </div>
  );
}

export default Invoices;
