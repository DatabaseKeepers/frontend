import { Badge, Container, Form, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNotifications } from "../contexts/NotificationContext";
import Banner from "./Banner";

function Notifications() {
  const notifications = useNotifications();

  const handleCheckboxChange = (event, notification) => {
    console.log(
      `Checkbox for notification ${notification.uid} is checked: ${event.target.checked}`
    );
  };

  return (
    <>
      <Banner text="Notification Center" />
      <Container className="my-5">
        {notifications.length === 0 ? (
          <div className="text-center">You have no notifications.</div>
        ) : (
          <ListGroup>
            {notifications.map((notification) => (
              <Link
                key={notification.uid}
                to={notification.to || "#"} // Use '#' as a fallback link if no 'to' property is provided
                className="text-decoration-none"
              >
                <ListGroup.Item
                  as="div"
                  className="py-4 d-flex justify-content-between align-items-center mb-3 shadow-sm rounded"
                    onClick={(e) => e.stopPropagation()}
                >
                  <div className="d-flex align-items-center">
                    <Form.Check
                      className="m-4"
                      type="checkbox"
                      id={`checkbox-${notification.uid}`}
                      label=""
                      onChange={(event) =>
                        handleCheckboxChange(event, notification)
                      }
                    />
                    <strong>{notification.message}</strong>
                  </div>
                  <div className="d-flex align-items-center">
                    <small className="text-muted me-5 mb-5">
                      {notification.createdAt}
                    </small>
                    <Badge
                      variant={notification.read ? "secondary" : "danger"}
                      className="p-2 rounded-circle mx-4"
                      style={{
                        width: "1rem",
                        height: "1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  </div>
                </ListGroup.Item>
              </Link>
            ))}
          </ListGroup>
        )}
      </Container>
    </>
  );
}

export default Notifications;
