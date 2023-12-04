import React from "react";
import Banner from "./Banner";
import WebFooter from "./WebFooter";

const ContactPage = () => {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem',
            marginLeft:'175px',
            marginRight:'175px',
            paddingBottom:'20px',
        },
        header: {
            color: '#0D6EFD',
            marginTop:'1.5rem',
            marginBottom: '1.5rem',
            fontSize: '20px',
            textAlign: 'center',
        },
        subHeader: {
            fontSize: '20px',
            margin: '1rem 0',
            textAlign: 'center', 
            marginLeft:'175px',
            marginRight:'175px',
            paddingBottom:'20px',
        },
        divider: {
            height: '2px',
            width: '55%',
            backgroundColor: '#0D6EFD',
            margin: '3.5rem 0',
            marginTop: '1rem',
        },
        contactInfo: {
            marginBottom: '1rem',
            display: 'flex', 
            justifyContent: 'space-evenly',
            width: '100%',
            fontSize: '20px',
            marginRight: '3rem',
        },
        infoBlock: {
            textAlign: 'center', 
        },
        feedback: {
            fontSize: '20px',
            textAlign: 'center',
            margin: '2rem 0',
            marginLeft:'175px',
            marginRight:'175px',
            paddingBottom:'150px',
        },
  
    };

    return (
        <div>
            <Banner text="Contact Us" />
            <div style={styles.container}>
                <h2 style={styles.header}>We're Here To Help</h2>
                <p style={styles.subHeader}>
                    Have questions, feedback, or need assistance? Feel free to get in touch with us.
                    Our customer support team is available to assist you with any inquiries or issues you may have.
                    Whether you're a patient seeking a second opinion or a healthcare professional using our
                    platform, we're here to help.
                </p>
                <div style={styles.divider}></div>
                 <h2 style={styles.header}>Contact Information</h2>
                <div style={styles.contactInfo}>
                    <div style={styles.infoBlock}>
                        <b style={styles.subheader}>Hours of Operation</b>
                        <p>Monday to Friday: 9:00 AM - 6:00 PM (Local Time)<br />Saturday: 10:00 AM - 4:00 PM (Local Time)<br />Sunday: Closed</p>
                    </div>
                    <div style={styles.infoBlock}>
                        <b style={styles.subheader}>Phone</b>
                        <p>(555) 132-4576</p>
                    </div>
                    <div style={styles.infoBlock}>
                        <b style={styles.subheader}>Email</b>
                        <p>General Inquiries: info@radiologyarchive.com<br />Support: support@radiologyarchive.com</p>
                    </div>
                </div>
                <div style={styles.divider}></div>
                <h2 style={styles.header}>Feedback and Suggestions</h2>
                <p style={styles.feedback}>
                    We value your feedback and suggestions. Your input helps us improve our services
                    and better serve your needs. Please share your thoughts and suggestions with us by
                    sending us an email.
                </p>
            </div>
            <WebFooter />
        </div>
    );
};

export default ContactPage;
