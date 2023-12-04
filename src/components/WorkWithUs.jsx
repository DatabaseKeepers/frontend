import React from "react";
import Banner from "./Banner";
import WebFooter from "./WebFooter";
import background_image1 from "../assets/background_image1.png";
import background_image2 from "../assets/background_image2.png";

const WorkWithUs = () => {
    const container = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        marginLeft:'175px',
        marginRight:'175px',
    }
    const headerStyle = {
        color: '#0D6EFD',
        marginTop:'5rem',
        marginBottom: '1.5rem',
        fontSize: '20px',
        textAlign: 'center',

    }
    const descriptionStyle ={
        fontSize: '20px',
        margin: '1rem 0',
        textAlign: 'center', 
        marginLeft:'100px',
        marginRight:'100px',
        paddingBottom:'20px',
    }
    const divider = {
        height: '2px',
        width: '55%',
        backgroundColor: '#0D6EFD',
        margin: '3.5rem 0',
        marginTop: '5rem',
    }
    const qualityDescription = {
        marginBottom: '20px'
    }
    const backgroundStyle1 = {
        backgroundImage: `url(${background_image1})`,
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '1200px' // Set the height or adjust as needed
    }
    const backgroundStyle2 = {
        backgroundImage: `url(${background_image2})`,
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '1200px' // Set the height or adjust as needed
    }

    return (
        <>
            <Banner text={"Work With Us"} />
            <div style={container}>
                <h4 style={headerStyle}>Join Our Radiology Team</h4>
                <p style={descriptionStyle}>
                    Are you a skilled radiologist looking to expand your professional opportunities?
                    RadiologyArchive offers a unique platform for experienced radiologists to join our esteemed team.
                </p>
                <div style={divider}></div>
            </div>
            <div style={backgroundStyle1}>
                <div style={container}>
                    <h4 style={headerStyle}>Who We Are</h4>
                    <p style={descriptionStyle}>
                        Radiology Archive is a leading platform dedicated to medical imaging and radiology services.
                        Our goal is to provide patients with access to expert radiologists worldwide for accurate diagnoses and second opinions.
                    </p>
                    <div style={divider}></div>
                    <h4 style={headerStyle}>Why Work With Us?</h4>
                    <p style={descriptionStyle}>
                        <p style={qualityDescription}>
                            <b>Global Reach</b><br></br>
                            Join a diverse team of radiologists and contribute to a global network of healthcare professionals.<br></br>
                        </p>
                        <p style={qualityDescription}>
                            <b>Cutting-Edge Technology</b><br></br>
                            Access advanced medical imaging tools and technology to provide accurate diagnoses.<br></br>
                        </p>
                        <p style={qualityDescription}>
                            <b>Flexibility</b><br></br>
                            Work remotely and at your convenience, providing your expertise to patients around the world.<br></br>
                        </p>
                        <p style={qualityDescription}>
                            <b>Professional Growth</b><br></br>
                            Collaborate with peers, learn from shared knowledge, and contribute to improving patient care globally.
                        </p>
                    </p>
                    <div style={divider}></div>
                </div>
            </div>
            <div style={container}>
                <h4 style={headerStyle}>Open Positions</h4>
                <p style={descriptionStyle}>
                    Radiology Archive is currently seeking radiologists with expertise in various sub-specialties, including but not limited to:<br></br><br></br>
                    <p style={qualityDescription}>
                        <b>Neuroradiology</b><br></br>
                        <b>Musculoskeletal Radiology</b><br></br>
                        <b>Pediatric Radiology</b><br></br>
                        <b>Cardiothoracic Radiology</b><br></br>
                        <b>Interventional Radiology</b><br></br>
                        <b>And More</b>
                    </p>
                </p>
                <div style={divider}></div>
            </div>
            <div style={backgroundStyle2}>
                <div style={container}>
                    <h2 style={headerStyle}>How to Apply</h2>
                    <p style={descriptionStyle}>
                        If you're a board-certified radiologist passionate about providing quality care and seeking new opportunities,
                        we'd love to hear from you.
                        To apply, please submit your resume and a cover letter indicating your area of expertise and interest to <i>apply@radiologyarchive.com</i>.
                    </p>
                    <div style={divider}></div>
                    <h2 style={headerStyle}>Our Commitment to Quality</h2>
                    <p style={descriptionStyle}>
                        At Radiology Archive, we prioritize patient care and accuracy in diagnoses.
                        Join our team and be part of a community dedicated to delivering the highest standards of radiology services.
                    </p>
                </div>
            </div>
            <WebFooter />
        </>
    );
};

export default WorkWithUs;