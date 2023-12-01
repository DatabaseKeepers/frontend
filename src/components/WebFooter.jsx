import React from "react";
import { Link } from "react-router-dom";


function WebFooter(){

    const footerStyle = {
        backgroundColor: '#5314BA',
        color: '#fff',
        padding: '20px',
      };
    
      const headerStyle = {
        textAlign: 'center',
        marginBottom: '10px',
        fontWeight: 'bold',
        paddingBottom:'20px'
      };
    
      const contentStyle = {
        marginLeft:'175px',
        marginRight:'175px',
        paddingBottom:'20px',
        
      };
      const linkStyle = {
        textDecoration: 'underline',
        cursor: 'pointer',
        color: '#fff',
        margin: '15px',
    };
    const dividerStyle = {
      color: '#fff',
      margin: '0 10px',
    };  
    const copyrightStyle = {
      textAlign: 'center',
      marginTop: '20px',
    };
  
    return (
    <footer style={footerStyle}>
        <div style={headerStyle}>
            <h2>About Us</h2>
        </div>
        <div style={contentStyle}>
            Welcome to Radiology Archive, where we believe that every individual should have easy access to their own 
                health information. Our mission is to revolutionize the way you interact with your medical imagery, providing 
                you with the tools and expertise to take charge of your healthcare decisions easy.
            
        </div>
        <div style={{ textAlign: 'center', paddingTop: '20px' }}>
                <Link to="/work" style={linkStyle}>Work with Us</Link>
                <span style={dividerStyle}>|</span>
                <Link to="/contact" style={linkStyle}>Contact Us</Link>
            </div>
            <div style={copyrightStyle}>
            &copy; {new Date().getFullYear()} Radiology Archive. All rights reserved.
            </div>
    </footer>
        );
}
export default WebFooter;