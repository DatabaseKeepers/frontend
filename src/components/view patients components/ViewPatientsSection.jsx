import React from "react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ViewPatientsSection = ({profileImage, patientName, dob, patientEmail, additionalText}) => {
    const navigate = useNavigate();

    const [showAdditionalText, setShowAdditionalText] = useState(false);

    const toggleAdditionalText = () => {
        setShowAdditionalText(!showAdditionalText);
    };
    const { role } = useAuth();

    const roleColor = (role) => {
        if (role == "Radiologist") {
            return "#E35D6A";
        }
        return "#0D6EFD"; // Physician color
    }

    function handleClick(image) {
        navigate("/imageview", { state: { image }})
    }

    const wrapperStyle ={
        border: "1.5px solid grey",
        //margin: '.2rem',
        overflow: 'hidden'
    }
    const docImageStyle ={
        margin: '20px',
    }
    const doctorTitleStyle ={
        fontWeight: 'bold',
        marginTop: 'auto'
    }
    const initialContainer ={
        display: 'flex',
        borderBottom: showAdditionalText ? '1.5px solid gray': '',
        justifyContent: 'center',
        alignItems: 'center'
    }
    const buttonStyle ={
        marginLeft: 'auto',
        color: 'white',
        border: '1px',
        padding: '10px',
        fontSize: '16px',
        width: '175px',
        height: '45px',
        cursor: 'pointer',
        display: 'center',
        borderRadius: '5px',
        marginRight: '2rem',
        backgroundColor: roleColor(role),
    }
    const additionalTextStyle = {
        fontSize: '16px',
        marginTop: '10px',
        marginLeft: '10px',
    }
    const additionalTextDiv={
        display: 'flex',
        flexDirection: 'column',
        margin: '10px',
    }

    return (
    <div style={wrapperStyle}>
    <div style={initialContainer}>
         <div>
             <img src={profileImage} alt="Your Image" style={docImageStyle} />
         </div>
             <div>
             <p style={doctorTitleStyle}>{patientName}</p>
             <p>DOB: {dob} </p>
             <p>{patientEmail}</p>
         </div>
         <button style={buttonStyle} onClick={toggleAdditionalText}>{showAdditionalText ? 'View  ':'View '} </button>
            {role === "Physician" ?
            <a href="upload"><button style={buttonStyle}>Add Image</button></a>
            : <></>
            }
        </div>
        {showAdditionalText && (
       <div style={additionalTextDiv}>
        <div>
        <p style={additionalTextStyle}>Medical Images: </p>
        </div>
        {additionalText ? (
            additionalText.map((image) => {
                return (
                    <img
                    onClick={() => {
                        handleClick(image);
                    }}
                    key={image.uid}
                    src={image.url}
                    alt={""}
                    style={{
                        width: "200px",
                        height: "auto",
                        marginBottom: "10px",
                        cursor: "pointer",
                    }}
                    />
                );
                })
        ) : (
            <p>No Medical Images</p>
        )}

       </div>
     )}
   </div>

  );
 };

export default ViewPatientsSection;
