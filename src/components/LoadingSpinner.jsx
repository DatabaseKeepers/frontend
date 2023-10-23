import { Container } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

function LoadingSpinner() {
  return (
    <Container fluid className="text-center">
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
    </Container>
  );
}

export default LoadingSpinner;
