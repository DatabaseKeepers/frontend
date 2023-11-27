import { Button, Col, Image, Modal, Row, Spinner } from "react-bootstrap";

function SecondOpinionImageSelectionModal({
  confirmToPayment,
  images,
  invoicing,
  handleClose,
  showModal,
  selectedImage,
  setSelectedImage,
}) {
  const ITEMS_PER_ROW = 4;

  const disableConfirmButton = !images.some(
    (image) => image.uid === selectedImage
  );

  const handleSelectImage = (uid) => {
    setSelectedImage(uid);
  };

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Select image for a second opinion
        </Modal.Title>
      </Modal.Header>

      <Modal.Body
        className="overflow-auto"
        style={{
          maxHeight: "528px",
        }}
      >
        {images.map(
          (_, index) =>
            index % ITEMS_PER_ROW === 0 && (
              <Row className="my-4" key={index}>
                {images.slice(index, index + ITEMS_PER_ROW).map((image) => (
                  <Col
                    className={`d-flex p-2 justify-content-center ${
                      selectedImage === image.uid ? "border border-primary" : ""
                    }`}
                    xs={12 / ITEMS_PER_ROW}
                    key={image.uid}
                    onClick={() => handleSelectImage(image.uid)}
                    style={{ border: "1px solid transparent" }}
                  >
                    <Image
                      alt={`${image.uid}`}
                      src={image.url}
                      style={{
                        cursor: "pointer",
                        height: "200px",
                        width: "250px",
                      }}
                      fluid
                    />
                  </Col>
                ))}
              </Row>
            )
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={confirmToPayment}
          disabled={disableConfirmButton}
        >
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
            "Confirm for Payment"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SecondOpinionImageSelectionModal;
