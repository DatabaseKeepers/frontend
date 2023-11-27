import React, { useState } from "react";
import { ModalTitle, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../constants.js";
import { useAuth } from "../contexts/AuthContext";
import Banner from "./Banner";
import WebFooter from "./WebFooter";
import DashboardSection from "./dashboard components/DashboardSection";
import Modal from 'react-bootstrap/Modal';

export default function ImageView() {
//This code makes use states for rating popup
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  }
////////////////////////////////////////////
//
  const { role, user } = useAuth();
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  let opinionCount = 0;

  const [image, setImage] = useState(state.image || {});
  const [showNote, setShowNote] = useState(false);
  const [showOpinions, setShowOpinions] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newNote, setNewNote] = useState(
    state.image.authors.find((author) => author.uid === user.uid)?.note || ""
  );
//css for role
  const roleColor = (role) => {
    if (role == "Radiologist") {
      return "#E35D6A";
    }
    else if(role === "Patient"){
      return "#479F76"
    }
    else
    return "#0D6EFD"; // Physician color
  };

  const textInputStyle = {
    height: "250px",
    width: "80%",
    padding: "10px",
    fontSize: "16px",
    marginTop: "5px",
    border: "2px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
    display: "block",
    margin: "0 auto",
    textAlign: "left",
  };
  function handleChange(event) {
    setNewNote(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    fetch(`${API_URL}/api/image/${image.uid}`, {
      method: "PUT",
      body: JSON.stringify({
        note: newNote,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // If api returns errors, display them
        if (data.errors && data.errors.length > 0) {
          alert(data.errors[0].msg);
          setSubmitting(false);
        }
        // If api returns success, update image state
        if (data.success) {
          const newAuthors = image.authors.map((author) => {
            if (author.uid === user.uid) {
              author.note = newNote;
            }
            return author;
          });

          // Check if a matching author was found
          const matchingAuthor = newAuthors.find((author) => author.uid === user.uid);

          // If no matching author was found, add the new object to the array
          if (!matchingAuthor) {
            newAuthors.push({
              uid: user.uid,
              note: newNote,
              role: role.toUpperCase(),
              full_name: user.displayName,
            });
          }

          setImage((prev) => ({
            uid: prev.uid,
            url: prev.url,
            authors: newAuthors,
          }));

          // timeout to simulate a delay in submitting
          setTimeout(() => {
            setSubmitting(false);
            alert("Note updated successfully!");
          }, 250);

          // this is required to update the state of the image in the dashboard
          // without this, the image will not show the updated note when refreshing
          navigate(pathname, { state: { image } });
        } else if (data.msg) {
          alert(data.msg);
          setSubmitting(false);
        } else {
          alert("Error updating note");
          setSubmitting(false);
        }
      })
      .catch((error) => {
        console.log("Error updating note: ", error);
        setSubmitting(false);
      });
  }
//css for entire page
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "10rem",
  };

  const noteHeaderStyle = {
    border: "1px solid #0080FF",
    backgroundColor: "#CFE2FF",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    width: "900px",
    height: "65px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  };

  const opinionsHeaderStyle = {
    border: "1px solid #FF0000",
    backgroundColor: "#F8D7DA",
    width: "900px",
    height: "65px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  };

  const opinionStyle = {
    padding: "100px",
    border: "1px solid grey",
    // backgroundColor: "grey",
  };

  const imageStyle = {
    width: "300px",
    height: "auto",
    marginLeft: "40px",
  };

  const opinionWrapperStlye = {
    marginLeft: "5rem",
  };

  const introStyle = {
    color: "#0D6EFD",
    margin: "3rem",
  };
  const buttonStyle = {
    marginLeft: "auto",
    color: "grey",
    border: "none",
    padding: "10px",
    fontSize: "16px",
    width: "30px",
    height: "auto",
    cursor: "pointer",
    display: "center",
    borderRadius: "5px",
    marginRight: "2rem",
    backgroundColor: "transparent",
  };
  const divider = {
    height: "3px",
    width: "50%",
    backgroundColor: "#0D6EFD",
    marginTop: "3.5rem",
    marginBottom: "50px",
  };
  const spanStyle = {
    marginLeft: "100px",
    fontWeight: "bold",
    fontSize: "17px",
  };
  const buttonStyle1 = {
    width: "250px",
    height: "40px",
    backgroundColor: roleColor(role),
    color: "white",
    borderRadius: "5px",
    fontSize: "18px",
    marginTop: "4rem",
    marginLeft: "15rem",
    marginBottom: "4rem",
  };
  const yourNotesStyle = {
    padding: "20px",
    marginLeft: "10rem",
    fontSize: "18px",
    fontWeight: "bold",
  };
////////////////////////////////


  return (
    <>
      <Banner text={"Medical Image Center"} />
      <h2 style={introStyle}>
        {state.image.name ||
          state.image.first_name + " " + state.image.last_name ||
          user.displayName}
        's Medical Images
      </h2>

      <div style={containerStyle}>
        <div>
          <img
            className="p-5"
            style={imageStyle}
            src={image.url}
            alt="Medical Image"
          />
        </div>
        <div style={opinionWrapperStlye}>
          <div style={noteHeaderStyle} onClick={() => setShowNote(!showNote)}>
            <span style={spanStyle}>Your physician notes:</span>
            <button
              style={buttonStyle}
              onClick={() => {
                setShowNote(!showNote);
              }}
            >
              {showNote ? "^" : "v"}
            </button>
          </div>
          {showNote &&
            (image.authors && image.authors.length > 0 ? (
              image.authors.map((author) => {
                if (author.role === "PHYSICIAN") {
                  return (
                    <div key={author.uid} style={opinionStyle}>
                      <p>{author.note}</p>
                      <span>By: {author.full_name}</span>
                      {author.recommendation ?
                      (<p style={{marginTop: "50px"}}>Recommended Radiologist: {author.recommendation}</p>):
                      ("")
                      }
                    </div>
                  );
                }
              })
            ) : (
              <div style={opinionStyle}>
                <p>No opinions</p>
              </div>
            ))}

          <div
            style={opinionsHeaderStyle}
            onClick={() => setShowOpinions(!showOpinions)}
          >
            <span style={spanStyle}>Radiologist Notes:</span>
            <button
              style={buttonStyle}
              onClick={() => {
                setShowOpinions(!showOpinions);
              }}
            >
              {showOpinions ? "^" : "v"}
            </button>
          </div>
          {showOpinions &&
            (image.authors && image.authors.length > 1 ? (
              image.authors.map((author) => {
                if (author.role === "RADIOLOGIST") {
                  opinionCount++;
                  return (
                    <div key={author.uid} style={opinionStyle}>
                      <p>Opinion {opinionCount}:</p>
                      <p style={{ whiteSpace: "break-spaces" }}>
                        {author.note}
                      </p>
                      <span>By: {author.full_name}</span>
                    </div>
                  );
                }
              })
            ) : (
              <div style={opinionStyle}>
                <p>No opinions</p>
              </div>
            ))}
        </div>
      </div>
      {role === "Radiologist" && (
        <form onSubmit={handleSubmit}>
          <div style={yourNotesStyle}>
            <label htmlFor="note">Your Notes:</label>
          </div>
          <br />
          <textarea
            id="note"
            type="text"
            name="note"
            value={newNote}
            onChange={handleChange}
            style={textInputStyle} //apply style to input
            rows={5}
          />
          <br />
          <button type="submit" style={buttonStyle1}>
            {submitting ? (
              <Spinner
                className="mx-5"
                size="sm"
                animation="border"
                role="status"
              >
                <span className="visually-hidden">Submitting...</span>
              </Spinner>
            ) : (
              "Submit Analysis"
            )}
          </button>
        </form>
      )}

      {role === "Patient" && (
        <div>
          <div style={{marginLeft: "80px"}}>
            <div style={divider} />
          </div>
          <DashboardSection
            role={role}
            isLast={false}
            headerDescription={"Want a Second Opinion?"}
            paragraphDescription={
              "If you want a better understanding of your medical image, we provide a wide selection of radiologists for you! All you need to is select the radiologist that is right for you and they’ll be on their way to interpret your chosen image!"
            }
            buttonDescription={"Get a Second Opinion"}
            buttonLink={"/secondopinion"}
          />
          <div style={{marginLeft: "80px", marginTop: "50px", marginBottom: "15rem" }}>
            <h2 style={{marginBottom:" 1.5rem", color:"#0D6EFD" }}>Rate your radiologist!</h2>
            <p style={{marginTop:" 1rem", marginBottom: "1rem", fontSize: '20px',}}>Leaving a rating helps patients like you have an easier time choosing the radiologist that is right for them! Please give your opinion on your chosen radiologist. </p>
            <button onClick={handleShow} style={{margin:" 1.25rem", width: '250px',height: '50px',backgroundColor: roleColor(role),color: 'white',borderRadius: '5px',fontSize:'20px'}}>Leave a Review</button>
          </div>

        {/*below is the code for the popup that allows the user to submit a rating */}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header style={{border:"none", display:"flex", justifyContent: "center", alignItems: "center"}} closeButton>
          </Modal.Header>
            <h2 style={{color:"#0D6EFD",display:"flex", justifyContent: "center", alignItems: "center"}}>Your Rating</h2>

          <Modal.Body style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <p style={{fontWeight:"600", margin: "50px "}}>Choose your radiologist below and give your opinion.</p>
            {/* need to make an api call for selection of radiologist to rate*/}
            <select name="" id=""> Choose a Radiologist to Rate</select>
            {/* the conditional down allows user to select stars for their ratings */}
            <div style={{margin:"3rem"}}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                key={star}
                onClick={() => handleStarClick(star)}
                style={{ cursor: 'pointer', fontSize: '24px', color: '#9747FF',}}
                >
                  {star<= rating? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                  </svg>)
                  : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                  </svg>)}
                </span>
              ))}
            </div>
            <button style={{backgroundColor:"#0D6EFD", color:"white", borderRadius:"5px", width:"300px", height: "auto", margin: "50px" }} onClick={handleClose}>Submit</button>
          </Modal.Body>
        </Modal>
        </div>
      )}
      <WebFooter />
      {/* end of patient rating */}
    </>
  );
}
