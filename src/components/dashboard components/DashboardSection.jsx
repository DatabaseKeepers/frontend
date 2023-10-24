import React from 'react';

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

    }
    const descriptionStyle ={
        fontSize: '20px',
    }

    const buttonStyle = {
        width: '250px',
        height: '50px',
        backgroundColor: roleColor(role),
        color: 'white',
        borderRadius: '5px',
        fontSize:'20px'
    }
    const divStyle = {
        marginLeft: '80px',
        marginTop:'50px',
        marginBottom: '75px'
    }
    const divider = {
        height: '3px',
        width: '50%',
        backgroundColor: '#0D6EFD',
        marginTop: '150px',
        marginBottom: '50px',
    }

    return(
    <div style={divStyle}>
        <h2 style={headerStyle}>{headerDescription}</h2>
        <p style={descriptionStyle}>{paragraphDescription}</p>
        <a href={buttonLink}><button style={buttonStyle}>{buttonDescription}</button></a>
        {!isLast && <div style={divider}/>}
    </div>
    )
}

export default DashboardSection
