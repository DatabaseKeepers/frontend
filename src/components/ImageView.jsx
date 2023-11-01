import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../constants.js";
import { useAuth } from "../contexts/AuthContext";
import Banner from "./Banner";
import WebFooter from "./WebFooter";
import DashboardSection from "./dashboard components/DashboardSection";

export default function ImageView() {
  const { role, user } = useAuth();
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  let opinionCount = 0;

  const [image, setImage] = useState(state.image || {});
  const [showNote, setShowNote] = useState(false);
  const [showOpinions, setShowOpinions] = useState(false);
  const [newNote, setNewNote] = useState(
    state.image.authors.find((author) => author.uid === user.uid)?.note || ""
  );

  const roleColor = (role) => {
    if (role == "Radiologist") {
      return "#E35D6A";
    }
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
        if (data.success) {
          const newAuthors = image.authors.map((author) => {
            if (author.uid === user.uid) {
              author.note = newNote;
            }
            return author;
          });
          setImage((prev) => ({
            uid: prev.uid,
            url: prev.url,
            authors: newAuthors,
          }));
          // this is required to update the state of the image in the dashboard
          // without this, the image will not show the updated note when refreshing
          navigate(pathname, { state: { image } });
        } else {
          alert("Error updating note");
        }
      })
      .catch((error) => {
        console.log("Error updating note: ", error);
      });
  }

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    // width:"50%",
    // height:'auto',
    // gap: "15%",
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
    marginTop: "150px",
    marginBottom: "50px",
    marginLeft: "5rem",
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

  return (
    <>
      <Banner text={"Medical Image Center"} />
      <h2 style={introStyle}>John Doe's Medical Images</h2>

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
            Submit Analysis
          </button>
        </form>
      )}

      {role === "Patient" && (
        <div>
          <div style={divider}></div>
          <DashboardSection
            role={role}
            isLast={true}
            headerDescription={"Want a Second Opinion?"}
            paragraphDescription={
              "If you want a better understanding of your medical image, we provide a wide selection of radiologists for you! All you need to is select the radiologist that is right for you and they’ll be on their way to interpret your chosen image!"
            }
            buttonDescription={"Get a Second Opinion"}
            buttonLink={"/secondopinion"}
          />
        </div>
      )}
      <WebFooter />
    </>
  );
}
