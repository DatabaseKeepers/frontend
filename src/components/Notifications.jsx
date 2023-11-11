import { Badge, Container, Form, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNotifications } from "../contexts/NotificationContext";
import { useAuth } from "../contexts/AuthContext";
import Banner from "./Banner";

function Notifications() {
  const notifications = useNotifications();

  const handleCheckboxChange = (event, notification) => {
    console.log(
      `Checkbox for notification ${notification.uid} is checked: ${event.target.checked}`
    );
  };
  
  const { role } = useAuth();
  const roleColor = (role) => {
    switch (role) {
      case "Patient":
        return "#479f76";
      case "Physician":
        return "#0D6EFD";
      case "Radiologist":
        return "#E35D6A";
    }
  };

  const handleRefresh = () => {
    window.location.href = window.location.href;
  };
  ///////////////////////////////////////////css
    const buttonStyles ={
      height: '50px',
      backgroundColor: roleColor(role),
      color: 'white',
      borderRadius: '5px',
      fontSize:'19px',
      fontWeight: "500",
    }

    const buttonContainer={
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "40px"
    }
    const markingButtons={
      justifyContent: "flex-end",
      marginLeft: "auto",
    }

    const headerStyle ={
      color: '#0D6EFD',
      margin: '5rem'
    }
  //////////////////////////////////////////////
  return (
    <>
      <Banner text="Notification Center" />
      <h2 style={headerStyle}>Your notifications</h2>
        
        <Container className="my-5">
            <div style={buttonContainer}>
              <button onClick={handleRefresh} style={{...buttonStyles, width:"100px"}}>⟳</button>

              <div style={markingButtons}>
                  <button style={{...buttonStyles,width: '180px',marginLeft: "20px"}}>Mark as Read</button>
                  <button style={{...buttonStyles,width: '180px',marginLeft: "20px"}}>Mark All as Read</button>
                  <button style={{...buttonStyles,width: '180px',marginLeft: "20px"}}>Mute</button>
              </div>
            </div>
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
      <a href="dashboard"><button style={{...buttonStyles,margin:"5rem"}}>Back to Dashboard</button></a>            
    </>
  );
}

export default Notifications;