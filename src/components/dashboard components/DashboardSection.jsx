import React from 'react';

function DashboardSection({isLast, headerDescription, paragraphDescription, buttonDescription, buttonLink}){

    const headerStyle = {
        color: '#0D6EFD',

    }
    const descriptionStyle ={
        fontSize: '20px',
    }

    const buttonStyle = {
        width: '250px',
        height: '50px',
        backgroundColor: "#479f76",
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
