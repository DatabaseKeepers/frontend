import React from "react";
import doctor1 from '../../assets/doctor1.png';
import doctor2 from '../../assets/doctor2.png';
import doctor3 from '../../assets/doctor3.png';
import doctor4 from '../../assets/doctor4.png';
import doctor5 from '../../assets/doctor5.png';
import doctor6 from '../../assets/doctor6.png';
import docvisit from '../../assets/docvisit.png';
import WebFooter from "../WebFooter.jsx";
import HomeNavBar from "../navbars/HomeNavBar.jsx";

import './Home.css';
function Home() {
  return (
    <div>
      <HomeNavBar/>
      <div className="hero">
        <div className="leftContainer">
          <h1>Get your medical scan interpreted today.</h1>
          <p>We provide a variety selection of radiologists for you to choose from. <br/> View your physician's notes and get a second opinion.</p>
          <a href="/Signup" className='btn btn-primary signup'>Sign Up</a>
        </div>
        <img id = "xrayPlaceholder"src={docvisit}/>
      </div>
      <div className="radiologistspictures">
        <div className="headertext">
        <h3>Meet Our Radiologists!</h3>
        </div>
        <div className="rows">
          <ul>
            <li className="doctorcontainer">
              <img src={doctor1}  className="doctorimage"/>
              <div className="doctordetails">
              <span className ="doctornames">Dr. Allison Mitchel</span>
              <span>Specialization: Diagnostic Radiology</span>
              </div>
            </li>
            <li className="doctorcontainer">
              <img src={doctor2} className="doctorimage"/>
              <div className="doctordetails">
              <span className ="doctornames">Dr. Benjamin Patel</span>
              <span>Specialization: Neuroradiology</span>
              </div>
              </li>
            <li className="doctorcontainer">
              <img src={doctor3} className="doctorimage"/>
              <div className="doctordetails">
              <span className ="doctornames">Dr. Emily Rodriguez</span>
              <span>Specialization: Pediatric Radiology</span>
              </div>
            </li>
            </ul>
            <ul>
            <li className="doctorcontainer">
              <img src={doctor4} className="doctorimage"/>
              <div className="doctordetails">
              <span className ="doctornames">Dr. James Anderson</span>
              <span>Specialization: Musculoskeletal Radiology</span>
              </div>
            </li>
            <li className="doctorcontainer">
            <img src={doctor5} className="doctorimage"/>
              <div className="doctordetails">
              <span className ="doctornames">Dr. Olivia Chang</span>
              <span>Specialization: Thoracic Radiology</span>
              </div>
            </li>
            <li className="doctorcontainer">
              <img src={doctor6} className="doctorimage"/>
              <div className="doctordetails">
              <span className ="doctornames">Dr. Michael Nguyen</span>
              <span>Specialization: Abdominal Radiology</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <WebFooter />
    </div>
  );
}

export default Home;
