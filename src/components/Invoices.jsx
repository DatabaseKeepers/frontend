import { useEffect, useState } from "react";
import Banner from "./Banner";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { API_URL } from "../constants.js";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const { user } = useAuth();

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
    };
    getInvoices();
  }, []);

  return (
    <div>
      <Banner text="Invoices Center" />
      <Container>
        <ListGroup className="my-3">
          {invoices &&
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
            })}
        </ListGroup>
      </Container>
    </div>
  );
}

export default Invoices;