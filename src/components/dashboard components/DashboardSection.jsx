import React from 'react';
import { Link } from 'react-router-dom';

function DashboardSection({role, isLast, headerDescription, paragraphDescription, buttonDescription, buttonLink}){

  const roleColor = (role) => {
    switch (role) {
      case "Patient":
        return "#479f76";
      case "Physician":
        return "#0D6EFD";
      case "Radiologist":
        return "#E35D6A";
      default:
        return "#479f76";
    }
  };
    const headerStyle = {
        color: '#0D6EFD',
        marginBottom: '1.5rem',

    }
    const descriptionStyle ={
        fontSize: '20px',
        marginTop: '1rem',
        marginBottom: '1rem',
    }

    const buttonStyle = {
        width: '250px',
        height: '50px',
        backgroundColor: roleColor(role),
        color: 'white',
        borderRadius: '5px',
        fontSize:'20px',
        margin: '1.25rem'
    }
    const divStyle = {
        marginLeft: '80px',
        marginTop:'50px',
        marginBottom: '1rem'
    }
    const divider = {
        height: '3px',
        width: '50%',
        backgroundColor: '#0D6EFD',
        marginTop: '3.5rem',
    }

    return(
    <div style={divStyle}>
        <h2 style={headerStyle}>{headerDescription}</h2>
        <p style={descriptionStyle}>{paragraphDescription}</p>
        <Link to={buttonLink}><button style={buttonStyle}>{buttonDescription}</button></Link>
        {!isLast && <div style={divider}/>}
    </div>
    )
}

export default DashboardSection
