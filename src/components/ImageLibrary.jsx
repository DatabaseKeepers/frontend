import React, { useEffect, useState } from 'react'
import Banner from './Banner'
import WebFooter from './WebFooter'
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../constants";
import { useAuth } from "../contexts/AuthContext";
import { Button, Container, Image } from "react-bootstrap";


export default function ImageLibrary() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      fetch(`${API_URL}/api/user/${user.uid}/images`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.accessToken,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setImages(data.images);
        })
        .catch((err) => console.error("Error fetching data: ", err));

    }
    fetchImages();

  }, []);

  function handleClick(image) {
    navigate("/imageview", { state: { image } });
  }
  //styles start here
  const divStyle = {
    margin: "10px",
    border: "solid 1px grey",
    width: "1000px",
    //height: "300px",
    height: "auto",
    alignItems: 'center',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px",
    position: "relative"
  }
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
  const imageStyle = {
    minWidth: "200px",
    maxWidth: "100%",
    height: "auto",
    maxHeight: "200px",
    maxWidth: "200px",
    marginLeft: "50px",
    marginBottom: "20px",
    flexShrink: 0
  }

  const buttonStyle = {
    position: "absolute",
    bottom: "10px",
    marginLeft: "auto",
    color: "white",
    border: "none",
    padding: "10px",
    fontSize: "16px",
    width: "100px",
    height: "50px",
    cursor: "pointer",
    display: "center",
    borderRadius: "5px",
    marginRight: "5rem",
    backgroundColor: '#479F76'
  }

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 'auto'
  };

  const introStyle = {
    color: '#0D6EFD',
    margin: '5rem'
  }
  const returnButton = {
    margin: "20rem",
    color: "white",
    border: "none",
    padding: "10px",
    fontSize: "30px",
    width: "auto",
    height: "auto",
    cursor: "pointer",
    display: "center",
    borderRadius: "5px",
    backgroundColor: '#479F76'

  }

  //styles end here
  return (
    <>
      <Banner text={"Medical Image Center"} />
      <h2 style={introStyle}>Your Medical Images</h2>
      <Container style={containerStyle}>
        {images.map((image) => {
          return (
            <div key={image.uid} style={divStyle}>

              <Image src={image.url} style={imageStyle} />
              <div style = {{position: 'relative' , width: '100%'}}>
                <div style = {{position: 'absolute' , bottom: '0', width: '100%', padding: '10px'}}>
                <p style = {{marginBottom: '5px'}}> Physician: {image.uploadedBy_title + " " + image.uploadedBy_first_name + " " + image.uploadedBy_last_name}</p>
                <p style = {{marginBottom: '0'}}> Upload Date: {new Date(image.createdAt + "UTC").toLocaleString(
                  [],
                  { dateStyle: "short", timeStyle: "short"},
                  "en-US"
                )}</p>
              </div>
              
              <div style = {buttonContainerStyle}>
              <button style={buttonStyle} onClick={() => { handleClick(image) }}>View</button>
              </div>
              </div>
              </div>
          )
        })}
      </Container>
      <Link to="/dashboard">
        <Button style={returnButton}>
          Back to Dashboard
        </Button>
      </Link>
      <WebFooter />
    </>
  )
}
