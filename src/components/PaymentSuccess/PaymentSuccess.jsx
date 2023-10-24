// PaymentSuccess.jsx
import React from 'react';
import WebFooter from "./WebFooter.jsx";
import './PaymentSuccess.css';
import checkmark from '../../assets/checkmark.png';
import PortalNavBar from '../navbars/PortalNavBar.jsx';

function PaymentSuccess() {
  return (
    <div>
      <PortalNavBar/>
      <header>
      <h1>
      Radiologist Center
      </h1>
      </header>

      <main className='App'>
        <div className = "paymentContainer">
          <img src={checkmark} className="checkmark"></img>
          <p className = "greenText"> Payment Complete!</p>
          <p className = "boldText">Thank you for choosing our radiologists!</p>
          <p className = "smallerText">Your chosen radiologist has received a notification letting them know to interpret your image!
          You will receive a notification when they have reviewed your scan within 48 hours.</p>
        </div>
        <div>
        <button className = "dashBoardButton"> Back to Dashboard </button>
        </div>
      </main> 
      <footer>
        <WebFooter></WebFooter>
      </footer>
    </div>
  );
}
export default PaymentSuccess;
